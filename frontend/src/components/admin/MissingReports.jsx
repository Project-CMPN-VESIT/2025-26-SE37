import React, { useState, useEffect } from "react";
import {
  UserSearch,
  Trash2,
  PlusCircle,
  Calendar,
  MapPin,
  ClipboardList,
  Megaphone,
} from "lucide-react";

const MissingReports = () => {
  const [activeTab, setActiveTab] = useState("claims");

  const [claims, setClaims] = useState([]);
  const [loadingClaims, setLoadingClaims] = useState(true);

  const [cases, setCases] = useState([]);
  const [loadingCases, setLoadingCases] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const adminRole = localStorage.getItem("adminRole");

  const initialForm = {
    name: "",
    age: "",
    gender: "",
    lastSeenDate: "",
    location: "",
    description: "",
    image: null,
  };
  const [formData, setFormData] = useState(initialForm);

  const loadClaims = async () => {
    setLoadingClaims(true);
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch("http://localhost:5000/api/reports/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (json.success) setClaims(json.data);
    } catch (e) {
      console.error("Failed to load claims", e);
    } finally {
      setLoadingClaims(false);
    }
  };

  const loadCases = async () => {
    setLoadingCases(true);
    try {
      const res = await fetch("http://localhost:5000/api/missing-persons/all");
      const json = await res.json();
      if (json.success) setCases(json.data);
    } catch (e) {
      console.error("Failed to load missing persons", e);
    } finally {
      setLoadingCases(false);
    }
  };

  useEffect(() => {
    loadClaims();
    loadCases();
  }, []);

  const handleDeleteClaim = async (id) => {
    if (!window.confirm("Delete this public claim permanently?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(
        `http://localhost:5000/api/reports/delete/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (res.ok) loadClaims();
    } catch (e) {
      alert("Failed to delete claim");
    }
  };

  const handleDeleteCase = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this missing person case?",
      )
    )
      return;
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(
        `http://localhost:5000/api/missing-persons/delete/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (res.ok) loadCases();
    } catch (e) {
      alert("Failed to delete case");
    }
  };

  const handlePublishSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("adminToken");
      const dataToSend = new FormData();

      dataToSend.append("name", formData.name);
      dataToSend.append("age", Number(formData.age)); // 🔥 Age explicitly Number ki tarah

      const finalGender =
        formData.gender === "Select" || !formData.gender ? "" : formData.gender;
      dataToSend.append("gender", finalGender);

      dataToSend.append("missingSince", formData.lastSeenDate);
      dataToSend.append("location", formData.location);

      // 🔥 FIX: Backend ko explicitly bhej rahe hain
      dataToSend.append("description", formData.description);
      dataToSend.append("details", formData.description); // Safety backup just in case backend expects 'details'

      if (formData.image) {
        dataToSend.append("image", formData.image);
      }

      const response = await fetch(
        "http://localhost:5000/api/missing-persons/add",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: dataToSend,
        },
      );

      const data = await response.json();

      if (data.success) {
        alert("Missing Person case published successfully!");
        setFormData(initialForm);
        document.getElementById("missing-photo-upload").value = "";
        loadCases();
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      alert("Server connection failed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors duration-300 font-sans">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 font-heading flex items-center gap-2">
            <UserSearch size={24} /> Missing Persons Portal
          </h2>
          <span className="text-sm text-slate-500 dark:text-slate-400 mt-1 block">
            Manage public claims and publish new missing cases.
          </span>
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab("claims")}
            className={`px-5 py-2 text-sm font-bold rounded-lg transition-all flex items-center gap-2 ${activeTab === "claims" ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"}`}
          >
            <ClipboardList size={16} /> Public Claims
          </button>
          <button
            onClick={() => setActiveTab("publish")}
            className={`px-5 py-2 text-sm font-bold rounded-lg transition-all flex items-center gap-2 ${activeTab === "publish" ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"}`}
          >
            <Megaphone size={16} /> Publish & Manage Cases
          </button>
        </div>
      </div>

      {activeTab === "claims" && (
        <div className="min-h-[400px] px-2 pb-4 -mx-2">
          {/* MOBILE VIEW (Cards) */}
          <div className="md:hidden space-y-4 px-2 mt-4 pb-4">
            {loadingClaims ? (
              <div className="p-10 text-center text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                Loading claims...
              </div>
            ) : claims.length === 0 ? (
              <div className="p-10 text-center text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                No public claims found.
              </div>
            ) : (
              claims.map((claim) => (
                <div
                  key={claim._id}
                  className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/50 p-4 rounded-2xl shadow-sm space-y-3"
                >
                  <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-700/50 pb-2">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                        Target Person
                      </div>
                      <div className="font-bold text-indigo-600 dark:text-indigo-400 text-base">
                        {claim.personName}
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium text-right">
                      {new Date(claim.createdAt).toLocaleDateString("en-IN")}
                      <br />
                      {new Date(claim.createdAt).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-1">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white text-sm">
                        {claim.reporterName}
                      </div>
                      <div className="text-xs font-mono text-slate-500">
                        {claim.phone}
                      </div>
                    </div>
                    <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase">
                      {claim.relation}
                    </span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700/50">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                      Message
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {claim.message || (
                        <span className="italic opacity-50">
                          No extra message
                        </span>
                      )}
                    </p>
                  </div>

                  {adminRole === "superadmin" && (
                    <div className="pt-2">
                      <button
                        onClick={() => handleDeleteClaim(claim._id)}
                        className="w-full flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase px-3 py-2 rounded-lg bg-rose-50 text-rose-600 border border-rose-100 dark:bg-rose-900/40 dark:text-rose-400 dark:border-rose-800/50 hover:bg-rose-600 hover:text-white transition-colors"
                      >
                        <Trash2 size={14} strokeWidth={2.5} /> Delete Claim
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* DESKTOP VIEW (Table) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-4 min-w-[900px]">
              <thead>
                <tr className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-bold">
                  <th className="px-5 py-2">Target Person</th>
                  <th className="px-5 py-2">Claimant Details</th>
                  <th className="px-5 py-2">Relationship</th>
                  <th className="px-5 py-2 w-1/4">Message / Info</th>
                  <th className="px-5 py-2">Date</th>
                  {adminRole === "superadmin" && (
                    <th className="px-5 py-2 text-center w-32">Action</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {loadingClaims ? (
                  <tr>
                    <td
                      colSpan={adminRole === "superadmin" ? 6 : 5}
                      className="p-10 text-center text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700"
                    >
                      Loading claims...
                    </td>
                  </tr>
                ) : claims.length === 0 ? (
                  <tr>
                    <td
                      colSpan={adminRole === "superadmin" ? 6 : 5}
                      className="p-10 text-center text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700"
                    >
                      No public claims found.
                    </td>
                  </tr>
                ) : (
                  claims.map((claim) => (
                    <tr
                      key={claim._id}
                      className="group hover:-translate-y-0.5 transition-transform duration-300"
                    >
                      <td className="p-5 bg-white dark:bg-slate-800/90 border-y border-slate-200 dark:border-slate-700/50 first:border-l last:border-r first:rounded-l-2xl last:rounded-r-2xl shadow-sm group-hover:shadow-md group-hover:border-indigo-200 dark:group-hover:border-indigo-500/50 transition-all font-bold text-indigo-600 dark:text-indigo-400 text-sm align-top">
                        {claim.personName}
                      </td>
                      <td className="p-5 bg-white dark:bg-slate-800/90 border-y border-slate-200 dark:border-slate-700/50 first:border-l last:border-r first:rounded-l-2xl last:rounded-r-2xl shadow-sm group-hover:shadow-md group-hover:border-indigo-200 dark:group-hover:border-indigo-500/50 transition-all align-top">
                        <div className="font-bold text-slate-900 dark:text-white text-sm">
                          {claim.reporterName}
                        </div>
                        <div className="text-xs font-mono text-slate-500 mt-1">
                          {claim.phone}
                        </div>
                      </td>
                      <td className="p-5 bg-white dark:bg-slate-800/90 border-y border-slate-200 dark:border-slate-700/50 first:border-l last:border-r first:rounded-l-2xl last:rounded-r-2xl shadow-sm group-hover:shadow-md group-hover:border-indigo-200 dark:group-hover:border-indigo-500/50 transition-all text-slate-700 dark:text-slate-300 text-sm font-bold align-top">
                        <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700">
                          {claim.relation}
                        </span>
                      </td>
                      <td className="p-5 bg-white dark:bg-slate-800/90 border-y border-slate-200 dark:border-slate-700/50 first:border-l last:border-r first:rounded-l-2xl last:rounded-r-2xl shadow-sm group-hover:shadow-md group-hover:border-indigo-200 dark:group-hover:border-indigo-500/50 transition-all text-slate-600 dark:text-slate-400 text-sm align-top">
                        {claim.message || (
                          <span className="italic opacity-50">
                            No extra message
                          </span>
                        )}
                      </td>
                      <td className="p-5 bg-white dark:bg-slate-800/90 border-y border-slate-200 dark:border-slate-700/50 first:border-l last:border-r first:rounded-l-2xl last:rounded-r-2xl shadow-sm group-hover:shadow-md group-hover:border-indigo-200 dark:group-hover:border-indigo-500/50 transition-all text-[11px] text-slate-500 font-medium align-top">
                        {new Date(claim.createdAt).toLocaleString("en-IN")}
                      </td>
                      {adminRole === "superadmin" && (
                        <td className="p-5 bg-white dark:bg-slate-800/90 border-y border-slate-200 dark:border-slate-700/50 first:border-l last:border-r first:rounded-l-2xl last:rounded-r-2xl shadow-sm group-hover:shadow-md group-hover:border-indigo-200 dark:group-hover:border-indigo-500/50 transition-all align-top">
                          <button
                            onClick={() => handleDeleteClaim(claim._id)}
                            className="w-full flex items-center justify-center gap-1.5 text-xs font-bold uppercase px-3 py-2 rounded-lg transition-all shadow-sm bg-slate-100 text-slate-600 border border-slate-200 hover:bg-rose-600 hover:text-white dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700 dark:hover:bg-rose-600 dark:hover:text-white transition-colors"
                          >
                            <Trash2 size={15} strokeWidth={2.5} /> Delete
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "publish" && (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800 h-fit">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              Post New Case
            </h3>
            <form onSubmit={handlePublishSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Enter name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Age *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                    className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="e.g. 45"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Gender *
                  </label>
                  <select
                    required
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Last Seen Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.lastSeenDate}
                  onChange={(e) =>
                    setFormData({ ...formData, lastSeenDate: e.target.value })
                  }
                  className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Last Seen Location *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g. Kalyan Station"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Description / Clothes worn *
                </label>
                <textarea
                  required
                  rows="3"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                  placeholder="Identifying marks, clothing..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Photo *
                </label>
                <input
                  type="file"
                  required
                  id="missing-photo-upload"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.files[0] })
                  }
                  className="w-full text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 dark:file:bg-indigo-900/30 dark:file:text-indigo-400 hover:file:bg-indigo-100 dark:hover:file:bg-indigo-900/50 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center gap-2 bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                <PlusCircle size={18} />{" "}
                {isSubmitting ? "Publishing..." : "Publish Case"}
              </button>
            </form>
          </div>

          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Active Missing Cases
              </h3>
              <span className="bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 px-3 py-1 rounded-full text-xs font-bold border border-indigo-100 dark:border-indigo-800/50">
                {cases.length} Published
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {loadingCases ? (
                <div className="col-span-full p-6 text-center text-slate-500">
                  Loading cases...
                </div>
              ) : cases.length === 0 ? (
                <div className="col-span-full p-6 text-center text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                  No active missing cases found.
                </div>
              ) : (
                cases.map((person) => (
                  <div
                    key={person._id}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[1.5rem] overflow-hidden shadow-sm flex flex-col group hover:shadow-md transition-all"
                  >
                    <div className="h-48 bg-slate-200 dark:bg-slate-800 relative overflow-hidden">
                      <img
                        src={
                          person.imageUrl?.startsWith("http")
                            ? person.imageUrl
                            : `http://localhost:5000${person.imageUrl}`
                        }
                        alt={person.fullName || person.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/300x400?text=No+Image";
                        }}
                      />
                      <div className="absolute top-3 right-3 bg-rose-600 text-white text-[10px] font-black px-2.5 py-1 rounded-md shadow animate-pulse tracking-wide">
                        MISSING
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h4 className="font-bold text-slate-900 dark:text-white text-xl mb-1 line-clamp-1">
                        {person.fullName || person.name}
                      </h4>
                      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-4">
                        {person.age} Years {person.gender && person.gender !== "Select" ? `• ${person.gender}` : ""}
                      </p>

                      <div className="space-y-2.5 mb-4">
                        <div className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                          <div className="text-slate-400 mt-0.5"><MapPin size={14} /></div>
                          <span className="font-medium leading-relaxed">{person.location}</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                          <div className="text-slate-400"><Calendar size={14} /></div>
                          <span className="font-medium">
                            {person.missingSince
                              ? new Date(person.missingSince).toLocaleDateString("en-IN")
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                      
                      {/* 🔥 FIX: Ab description directly UI me dikhega */}
                      {(person.description || person.details) && (
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800 italic leading-relaxed">
                          "{person.description || person.details}"
                        </p>
                      )}

                      <button
                        onClick={() => handleDeleteCase(person._id)}
                        className="w-full flex justify-center items-center gap-2 text-rose-600 hover:text-white dark:text-rose-400 font-bold text-xs bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-600 dark:hover:bg-rose-600 border border-rose-100 dark:border-rose-800/50 hover:border-transparent py-2.5 rounded-xl transition-colors mt-auto uppercase tracking-wide"
                      >
                        <Trash2 size={14} strokeWidth={2.5}/> Mark Found / Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MissingReports;
