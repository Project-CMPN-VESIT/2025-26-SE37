import React, { useState, useEffect } from "react";
import { CheckSquare, Trash2 } from "lucide-react";

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("active");

  const loadVolunteers = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/volunteers/all");
      const json = await res.json();
      if (json.success) setVolunteers(json.data);
    } catch (e) { console.error("Failed", e); } 
    finally { setLoading(false); }
  };

  useEffect(() => { loadVolunteers(); }, []);

  const handleResolve = async (id) => {
    if (!window.confirm("Mark as resolved?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/volunteers/update/${id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "Resolved" }),
      });
      if (res.ok) loadVolunteers();
    } catch (e) { alert("Failed"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete permanently?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/volunteers/delete/${id}`, { method: "DELETE" });
      if (res.ok) loadVolunteers();
    } catch (e) { alert("Delete failed"); }
  };

  const filteredVolunteers = volunteers.filter((v) => 
    viewMode === "active" ? v.status !== "Resolved" : v.status === "Resolved"
  );

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 font-heading">Volunteers</h2>
          <span className="text-sm text-slate-500 dark:text-slate-400 mt-1 block">Manage incoming help requests</span>
        </div>
        <div className="flex gap-2 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-lg w-fit">
          <button onClick={() => setViewMode("active")} className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${viewMode === "active" ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-slate-500 dark:text-slate-400"}`}>Active Requests</button>
          <button onClick={() => setViewMode("resolved")} className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${viewMode === "resolved" ? "bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm" : "text-slate-500 dark:text-slate-400"}`}>Resolved History</button>
        </div>
      </div>
      
      <div className="overflow-x-auto min-h-[300px]">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs tracking-wider border-b dark:border-slate-800">
              <th className="p-4 font-bold uppercase">Name</th>
              <th className="p-4 font-bold uppercase">Contact</th>
              <th className="p-4 font-bold uppercase">How they can help</th>
              <th className="p-4 font-bold uppercase">Date</th>
              <th className="p-4 font-bold uppercase text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {loading ? <tr><td colSpan="5" className="p-8 text-center text-slate-500">Loading...</td></tr> : filteredVolunteers.length === 0 ? (
              <tr><td colSpan="5" className="p-8 text-center text-slate-500">No {viewMode} applications.</td></tr>
            ) : (
              filteredVolunteers.map((v) => (
                <tr key={v._id} className="hover:bg-slate-50/80 dark:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-medium text-slate-800 dark:text-slate-200">{v.name}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">{v.phone}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400 max-w-xs truncate" title={v.helpText}>{v.helpText}</td>
                  <td className="p-4 text-slate-500 dark:text-slate-400 text-sm">{new Date(v.createdAt).toLocaleDateString("en-IN")}</td>
                  <td className="p-4 flex justify-center items-center gap-2">
                    {v.status !== "Resolved" ? (
                      <button onClick={() => handleResolve(v._id)} className="flex items-center gap-1.5 text-xs font-bold uppercase px-3 py-1.5 rounded-lg transition-all shadow-sm bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-600 hover:text-white dark:bg-indigo-900/40 dark:text-indigo-400 dark:border-indigo-800/50 dark:hover:bg-indigo-600 dark:hover:text-white dark:hover:border-transparent">
                        <CheckSquare size={14} strokeWidth={2.5} /> Resolve
                      </button>
                    ) : (
                      <span className="text-xs font-bold uppercase px-3 py-1.5 rounded-lg border bg-emerald-50/50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">
                        Resolved
                      </span>
                    )}
                    <button onClick={() => handleDelete(v._id)} className="flex items-center gap-1.5 text-xs font-bold uppercase px-3 py-1.5 rounded-lg transition-all shadow-sm bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-600 hover:text-white dark:bg-rose-900/40 dark:text-rose-400 dark:border-rose-800/50 dark:hover:bg-rose-600 dark:hover:text-white dark:hover:border-transparent">
                      <Trash2 size={14} strokeWidth={2.5} /> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Volunteers;