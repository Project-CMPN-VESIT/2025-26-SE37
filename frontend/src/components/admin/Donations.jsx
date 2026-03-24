import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, Trash2 } from "lucide-react";

const Donations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("pending");

  const loadDonations = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/donations/all");
      const json = await res.json();
      if (json.success) setDonations(json.data);
    } catch (e) { console.error("Failed to load donations", e); } 
    finally { setLoading(false); }
  };

  useEffect(() => { loadDonations(); }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    if (!window.confirm(`Are you sure you want to mark this as ${newStatus}?`)) return;
    try {
      const res = await fetch(`http://localhost:5000/api/donations/update/${id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) loadDonations();
    } catch (e) { alert("Failed to update status"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bhai, pakka delete karna hai? Yeh wapas nahi aayega.")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/donations/delete/${id}`, { method: "DELETE" });
      if (res.ok) loadDonations();
    } catch (e) { alert("Delete failed!"); }
  };

  const filteredDonations = donations.filter((d) => {
    const currentStatus = d.status || "Pending";
    return viewMode === "pending" ? currentStatus === "Pending" : currentStatus !== "Pending";
  });

  const totalVerifiedAmount = donations.filter((d) => d.status === "Verified").reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">
       <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 font-heading">Donations</h2>
          <span className="text-sm text-slate-500 dark:text-slate-400 mt-1 block">Verify UTRs against your bank app</span>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 rounded-lg border border-emerald-100 dark:border-emerald-800/30 text-right">
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">Total Verified Funds</p>
            <p className="text-xl font-bold text-emerald-700 dark:text-emerald-300">₹{totalVerifiedAmount.toLocaleString("en-IN")}</p>
          </div>
          <div className="flex gap-2 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-lg w-fit">
            <button onClick={() => setViewMode("pending")} className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${viewMode === "pending" ? "bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-sm" : "text-slate-500 dark:text-slate-400"}`}>Pending Verification</button>
            <button onClick={() => setViewMode("history")} className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${viewMode === "history" ? "bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm" : "text-slate-500 dark:text-slate-400"}`}>Verified / Rejected</button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto min-h-[300px]">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs tracking-wider border-b dark:border-slate-800">
              <th className="p-4 font-bold uppercase">Donor Info</th>
              <th className="p-4 font-bold uppercase">Amount</th>
              <th className="p-4 font-bold uppercase">Ref / UTR ID</th>
              <th className="p-4 font-bold uppercase">Date</th>
              <th className="p-4 font-bold uppercase text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {loading ? (
              <tr><td colSpan="5" className="p-8 text-center text-slate-500">Loading...</td></tr>
            ) : filteredDonations.length === 0 ? (
              <tr><td colSpan="5" className="p-8 text-center text-slate-500">No records found.</td></tr>
            ) : (
              filteredDonations.map((d) => (
                <tr key={d._id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-slate-800 dark:text-slate-200">{d.name}</div>
                    <div className="text-xs text-slate-500 mt-1">{d.phone} | {d.email || "No Email"}</div>
                  </td>
                  <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400">₹{d.amount}</td>
                  <td className="p-4">
                    <span className="font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs border border-slate-200 dark:border-slate-700">{d.referenceId || "N/A"}</span>
                  </td>
                  <td className="p-4 text-slate-500 dark:text-slate-400 text-sm">{new Date(d.createdAt).toLocaleDateString("en-IN")}</td>
                  <td className="p-4 flex justify-center items-center gap-2">
                    {viewMode === "pending" ? (
                      <>
                        <button onClick={() => handleUpdateStatus(d._id, "Verified")} className="flex items-center gap-1.5 text-xs font-bold uppercase px-3 py-1.5 rounded-lg transition-all shadow-sm bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-600 hover:text-white dark:bg-emerald-900/40 dark:text-emerald-400 dark:border-emerald-800/50 dark:hover:bg-emerald-600 dark:hover:text-white dark:hover:border-transparent">
                          <CheckCircle size={14} strokeWidth={2.5} /> Verify
                        </button>
                        <button onClick={() => handleUpdateStatus(d._id, "Rejected")} className="flex items-center gap-1.5 text-xs font-bold uppercase px-3 py-1.5 rounded-lg transition-all shadow-sm bg-amber-50 text-amber-600 border border-amber-100 hover:bg-amber-600 hover:text-white dark:bg-amber-900/40 dark:text-amber-400 dark:border-amber-800/50 dark:hover:bg-amber-600 dark:hover:text-white dark:hover:border-transparent">
                          <XCircle size={14} strokeWidth={2.5} /> Reject
                        </button>
                      </>
                    ) : (
                      <span className={`text-xs font-bold uppercase px-3 py-1.5 rounded-lg border ${d.status === "Verified" ? "bg-emerald-50/50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20" : "bg-amber-50/50 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20"}`}>
                        {d.status}
                      </span>
                    )}
                    <button onClick={() => handleDelete(d._id)} className="flex items-center gap-1.5 text-xs font-bold uppercase px-3 py-1.5 rounded-lg transition-all shadow-sm bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-600 hover:text-white dark:bg-rose-900/40 dark:text-rose-400 dark:border-rose-800/50 dark:hover:bg-rose-600 dark:hover:text-white dark:hover:border-transparent">
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

export default Donations;