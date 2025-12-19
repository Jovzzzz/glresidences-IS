import { useState, useEffect, useMemo, useCallback } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Rooms from "./pages/Rooms";
import Tenants from "./pages/Tenants";
import Dashboard from "./pages/Dashboard";
import ContactPage from "./pages/Contacts";
import AboutUs from "./pages/AboutUs";
import ProtectedRoute from "./context/ProtectedRoute";
import buildingPhoto from "/src/assets/images/GLOrig.jpg";

const WelcomeSection = ({ darkMode }) => (
  <section className={`flex flex-col md:flex-row items-center gap-12 shadow-2xl rounded-3xl p-12 border-2 hover:shadow-3xl transition-all duration-500 animate-fade-in ${darkMode ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 text-white" : "bg-gradient-to-br from-white to-gray-50 border-gray-200"}`}>
    <img
      src={buildingPhoto}
      className="w-full md:w-1/3 rounded-2xl shadow-lg object-cover ring-2 ring-gray-300 hover:ring-4 hover:ring-blue-400 transition-all duration-500 transform hover:scale-105 hover:shadow-xl"
      alt="GL Residences"
    />
    <div className="text-center md:text-left">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-bounce-in">
        Welcome to GL Residences
      </h1>
      <p className={`text-xl leading-relaxed max-w-2xl mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
        Your all-in-one resident and tenant management system. Easily monitor tenants, updates, building information, and important reminders — all from your dashboard.
      </p>
      <p className={`text-xl leading-relaxed max-w-2xl italic font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
        ~Your Space, Your Style, Your Home~
      </p>
    </div>
  </section>
);

const QuickActionsSection = ({ navigate, darkMode }) => (
  <section className="animate-fade-in">
    <h2 className={`text-4xl font-bold mb-8 flex items-center gap-3 ${darkMode ? "text-white" : "text-gray-800"}`}>
      <span className="text-4xl">⚡</span>
      Quick Actions
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div
        onClick={() => navigate("/tenants")}
        className={`shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 p-10 rounded-3xl border-2 cursor-pointer focus:ring-4 focus:ring-blue-500 animate-slide-in ${darkMode ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:bg-gradient-to-br hover:from-gray-700 hover:to-gray-800" : "bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50"}`}
        tabIndex={0}
        role="button"
        aria-label="View Tenants"
        onKeyDown={(e) => e.key === "Enter" && navigate("/tenants")}
      >
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">👥</span>
          <h3 className={`font-bold text-2xl ${darkMode ? "text-white" : "text-gray-800"}`}>View Tenants</h3>
        </div>
        <p className={`text-base leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Browse all registered tenants and manage their details effortlessly.</p>
      </div>
      <div
        onClick={() => navigate("/tenants")}
        className={`shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 p-10 rounded-3xl border-2 cursor-pointer focus:ring-4 focus:ring-blue-500 animate-slide-in ${darkMode ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:bg-gradient-to-br hover:from-gray-700 hover:to-gray-800" : "bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50"}`}
        tabIndex={0}
        role="button"
        aria-label="Add Tenant"
        onKeyDown={(e) => e.key === "Enter" && navigate("/tenants")}
      >
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">➕</span>
          <h3 className={`font-bold text-2xl ${darkMode ? "text-white" : "text-gray-800"}`}>Add Tenant</h3>
        </div>
        <p className={`text-base leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Register new tenant information quickly and securely.</p>
      </div>
    </div>
  </section>
);

const BuildingInfoSection = ({ darkMode }) => (
  <section className="animate-fade-in">
    <h2 className={`text-4xl font-bold mb-8 flex items-center gap-3 ${darkMode ? "text-white" : "text-gray-800"}`}>
      <span className="text-4xl">🏢</span>
      Building Information
    </h2>
    <div className={`shadow-xl rounded-3xl border-2 p-10 leading-relaxed space-y-4 hover:shadow-2xl transition-all duration-500 ${darkMode ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 text-gray-300" : "bg-gradient-to-br from-white to-gray-50 border-gray-200 text-gray-700"}`}>
      <p className="flex items-center text-lg">
        <span className="mr-3 text-2xl">👤</span>
        <strong>Owner:</strong> GL Residences Management
      </p>
      <p className="flex items-center text-lg">
        <span className="mr-3 text-2xl">📍</span>
        <strong>Location:</strong> Brgy. Say-Oan, Bacnotan, La Union, Near DMMMSU-NLUC
      </p>
      <p className="flex items-center text-lg">
        <span className="mr-3 text-2xl">🏗️</span>
        <strong>Total Floors:</strong> 3 Floors
      </p>
      <p className="flex items-center text-lg">
        <span className="mr-3 text-2xl">🏠</span>
        <strong>Total Rooms:</strong> 20 Rooms
      </p>
      <p className="flex items-center text-lg">
        <span className="mr-3 text-2xl">📞</span>
        <strong>Support Contact:</strong> +63 917 115 3313
      </p>
    </div>
  </section>
);

const App = () => {
  const [sidebarToggle, setSidebarToggle] = useState(true);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const navigate = useNavigate();

  const toggleSidebar = useCallback(() => setSidebarToggle(!sidebarToggle), [sidebarToggle]);

  useEffect(() => {
    document.body.className = darkMode ? "dark bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white" : "bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 text-gray-900";
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const homeContent = useMemo(() => (
    <div className="space-y-16 p-4 md:p-8">
      <WelcomeSection darkMode={darkMode} />
      <QuickActionsSection navigate={navigate} darkMode={darkMode} />
      <BuildingInfoSection darkMode={darkMode} />
    </div>
  ), [darkMode, navigate]);

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black" : "bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100"}`}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="flex h-screen overflow-hidden">
                <Sidebar isOpen={sidebarToggle} darkMode={darkMode} />
                <div className="flex flex-col flex-1 transition-all duration-300">
                  <Header onSidebarToggle={toggleSidebar} darkMode={darkMode} setDarkMode={setDarkMode} />
                  <main className={`flex-1 p-8 md:p-12 overflow-y-auto rounded-tl-3xl shadow-inner transition-all duration-500 ${darkMode ? "bg-gray-800/80 backdrop-blur-lg" : "bg-white/80 backdrop-blur-lg"}`}>
                    <Routes>
                      <Route path="/" element={homeContent} />
                      <Route path="/tenants" element={<Tenants />} />
                      <Route path="/rooms" element={<Rooms />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/about" element={<AboutUs />} />
                      <Route path="/contacts" element={<ContactPage />} />
                    </Routes>
                  </main>
                  <footer className={`p-1 text-center text-base font-medium shadow-inner ${darkMode ? "bg-gradient-to-r from-gray-900 to-gray-800 text-gray-400" : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600"}`}>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <span className="text-xl">🏠</span>
                      <span>© 2025 GL Residences. All rights reserved.</span>
                    </div>
                    <p className="italic">Your Space, Your Style, Your Home.</p>
                  </footer>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;