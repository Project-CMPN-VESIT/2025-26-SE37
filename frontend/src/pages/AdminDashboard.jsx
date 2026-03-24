import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Professional Icons Import
import { 
  LayoutDashboard, 
  UserPlus, 
  Database, 
  HeartHandshake, 
  Users, 
  AlertCircle,
  CalendarDays,
  UserSearch,
  Mail
} from "lucide-react";
import { CiLight, CiDark } from "react-icons/ci";

// Importing our modular components
import DashboardOverview from "../components/admin/DashboardOverview";
import AddPerson from "../components/admin/AddPerson";
import Records from "../components/admin/Records";
import Donations from "../components/admin/Donations";
import Volunteers from "../components/admin/Volunteers";
import RescueRequests from "../components/admin/RescueRequests";
import ContactMessages from "../components/admin/ContactMessages";
import MissingReports from "../components/admin/MissingReports";
import ManageEvents from "../components/admin/ManageEvents";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Persistent Theme Logic
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setIsSidebarOpen(false);
  };

  // Full Feature List with Premium Icons
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { id: "add", label: "Add Person", icon: <UserPlus size={20} /> },
    { id: "records", label: "View Records", icon: <Database size={20} /> },
    { id: "events", label: "Manage Events", icon: <CalendarDays size={20} /> },
    { id: "donations", label: "Donations", icon: <HeartHandshake size={20} /> },
    { id: "volunteers", label: "Volunteers", icon: <Users size={20} /> },
    { id: "rescues", label: "Rescue Alerts", icon: <AlertCircle size={20} /> },
    { id: "missing-reports", label: "Missing Claims", icon: <UserSearch size={20} /> },
    { id: "contacts", label: "Inbox", icon: <Mail size={20} /> },
  ];

  const handleLogout = () => {
    navigate("/admin");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return <DashboardOverview />;
      case "add": return <AddPerson />;
      case "records": return <Records />;
      case "events": return <ManageEvents />;
      case "donations": return <Donations />;
      case "volunteers": return <Volunteers />;
      case "rescues": return <RescueRequests />;
      case "missing-reports": return <MissingReports />;
      case "contacts": return <ContactMessages />;
      default: return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 font-sans overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* Sidebar Section */}
      <aside className={`fixed md:relative z-50 w-64 h-full bg-white dark:bg-slate-900 shadow-2xl md:shadow-none flex flex-col border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">Maa Astha</h2>
            <p className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">Admin Portal</p>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-red-500">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id
                  ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-semibold shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <span className={activeTab === item.id ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"}>
                {item.icon}
              </span>
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-800 p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 text-slate-500" onClick={() => setIsSidebarOpen(true)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <h2 className="font-bold text-slate-700 dark:text-slate-200 capitalize text-lg tracking-tight">
              {activeTab.replace("-", " ")}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle with CiLight & CiDark */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:ring-2 ring-indigo-200 dark:ring-slate-700 transition-all"
              title="Toggle Theme"
            >
              {theme === "light" ? <CiDark size={24} /> : <CiLight size={24} className="text-yellow-400" />}
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-lg hover:bg-rose-600 hover:text-white transition-all font-semibold text-sm border border-rose-100 dark:border-rose-900/50"
            >
              <span className="hidden sm:inline">Logout</span>
              <LayoutDashboard size={16} className="rotate-180" /> 
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 dark:bg-slate-950 p-6">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;