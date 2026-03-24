import React, { useState, useEffect } from "react";
import { Clock, ShieldCheck, Ban, Trash2 } from "lucide-react";

const RescueRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("active");

  const loadRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/rescue-requests/all");
      const json = await res.json();
      if (json.success) setRequests(json.data);
    } catch (e) { console.error("Failed", e); } 
    finally { setLoading(false); }
  };

  useEffect(() => { loadRequests(); }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    if (!window.confirm(`Mark this alert as ${newStatus}?`)) return;
    try {
      const res = await fetch(`http://localhost:5000/api/rescue-requests/update/${id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) loadRequests();
    } catch (e) { alert("Failed"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bhai, delete karna hai?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/rescue-requests/delete/${id}`, { method: "DELETE" });
      if (res.ok) loadRequests();
    } catch (e) { alert("Delete failed!"); }
  };

  const filteredRequests = requests.filter((r) => {
    const isResolved = r.status === "Rescued" || r.status === "Invalid";
    return viewMode === "active" ? !isResolved : isResolved;
  });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-rose-600 dark:text-rose-500 font-heading">Emergency Alerts</h2>
          <span className="text-sm text-slate-500 dark:text-slate-400 mt-1 block">Prioritize and manage rescues</span>
        </div>
        <div className="flex gap-2 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-lg w-fit">
          <button onClick={() => setViewMode("active")} className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${viewMode === "active" ? "bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-sm" : "text-slate-500 dark:text-slate-400"}`}>Active Alerts</button>
          <button onClick={() => setViewMode("resolved")} className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${viewMode === "resolved" ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 shadow-sm" : "text-slate-500 dark:text-slate-400"}`}>Past Alerts</button>
        </div>
      </div>
      
      <div className="overflow-x-auto min-h-[300px]">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs tracking-wider border-b dark:border-slate-800">
              <th className="p-4 font-bold uppercase">Location</th>
              <th className="p-4 font-bold uppercase">Condition</th>
              <th className="p-4 font-bold uppercase">Reporter</th>
              <th className="p-4 font-bold uppercase text-center">Photo</th>
              <th className="p-4 font-bold uppercase text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {loading ? <tr><td colSpan="5" className="p-8 text-center text-slate-500">Loading...</td></tr> : filteredRequests.map((r) => (
                <tr key={r._id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-medium text-slate-800 dark:text-slate-200">{r.location}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">{r.condition}</td>
                  <td className="p-4">
                    <div className="text-slate-800 dark:text-slate-200">{r.reporterName || "Anonymous"}</div>
                    <div className="text-xs text-slate-500">{r.reporterPhone}</div>
                  </td>
                  <td className="p-4 text-center">
                    {r.photoUrl ? <a href={`http://localhost:5000${r.photoUrl}`} target="_blank" rel="noreferrer" className="text-indigo-500 hover:text-indigo-700 underline text-sm">View</a> : <span className="text-slate-400 text-sm">N/A</span>}
                  </td>
                  <td className="p-4 flex justify-center items-center gap-2">
                    {viewMode === "active" ? (
                      <>
                        {r.status !== "In Progress" && (
                          <button onClick={() => handleUpdateStatus(r._id, "In Progress")} className="flex items-center gap-1.5 text-xs font-bold uppercase px-3 py-1.5 rounded-lg transition-all shadow-sm bg-amber-50 text-amber-600 border border-amber-100 hover:bg-amber-600 hover:text-white dark:bg-amber-900/40 dark:text-amber-400 dark:border-amber-800/50 dark:hover:bg-amber-600 dark:hover:text-white dark:hover:border-transparent">
                            <Clock size={14} strokeWidth={2.5} /> Progress
                          </button>
                        )}
                        <button onClick={() => handleUpdateStatus(r._id, "Rescued")} className="flex items-center gap-1.5 text-xs font-bold uppercase px-3 py-1.5 rounded-lg transition-all shadow-sm bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-600 hover:text-white dark:bg-emerald-900/40 dark:text-emerald-400 dark:border-emerald-800/50 dark:hover:bg-emerald-600 dark:hover:text-white dark:hover:border-transparent">
                          <ShieldCheck size={14} strokeWidth={2.5} /> Rescued
                        </button>
                        <button onClick={() => handleUpdateStatus(r._id, "Invalid")} className="flex items-center gap-1.5 text-xs font-bold uppercase px-3 py-1.5 rounded-lg transition-all shadow-sm bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-500 hover:text-white dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700 dark:hover:bg-slate-600 dark:hover:text-white dark:hover:border-transparent">
                          <Ban size={14} strokeWidth={2.5} /> Invalid
                        </button>
                      </>
                    ) : (
                      <span className="text-xs font-bold uppercase px-3 py-1.5 rounded-lg border bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700">
                        {r.status}
                      </span>
                    )}
                    <button onClick={() => handleDelete(r._id)} className="flex items-center gap-1.5 text-xs font-bold uppercase px-3 py-1.5 rounded-lg transition-all shadow-sm bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-600 hover:text-white dark:bg-rose-900/40 dark:text-rose-400 dark:border-rose-800/50 dark:hover:bg-rose-600 dark:hover:text-white dark:hover:border-transparent">
                      <Trash2 size={14} strokeWidth={2.5} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RescueRequests;