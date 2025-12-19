import { useEffect, useState, useMemo, useCallback } from "react";
import { api } from "../services/api";



const PieChart = ({ occupied, vacant, total }) => {
  const occupiedAngle = (occupied / total) * 360;
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4">
      <svg width="150" height="150" className="transition-transform hover:scale-110 duration-500">
        <defs>
          <linearGradient id="occupiedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#10b981", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#059669", stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="vacantGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#ef4444", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#dc2626", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <circle cx="75" cy="75" r="60" fill="none" stroke="#e5e7eb" strokeWidth="12" />
        <circle
          cx="75"
          cy="75"
          r="60"
          fill="none"
          stroke="url(#occupiedGradient)"
          strokeWidth="12"
          strokeDasharray={`${occupiedAngle} 360`}
          strokeLinecap="round"
          transform="rotate(-90 75 75)"
          className="transition-all duration-1000"
        />
        <circle
          cx="75"
          cy="75"
          r="60"
          fill="none"
          stroke="url(#vacantGradient)"
          strokeWidth="12"
          strokeDasharray={`${360 - occupiedAngle} 360`}
          strokeDashoffset={`${occupiedAngle}`}
          strokeLinecap="round"
          transform="rotate(-90 75 75)"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="text-center space-y-2">
        <p className="text-lg font-semibold flex items-center justify-center">
          <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
          Occupied: {occupied} ({Math.round((occupied / total) * 100)}%)
        </p>
        <p className="text-lg font-semibold flex items-center justify-center">
          <span className="w-4 h-4 bg-red-500 rounded-full mr-2"></span>
          Vacant: {vacant} ({Math.round((vacant / total) * 100)}%)
        </p>
      </div>
    </div>
  );
};

const BarChart = ({ data, maxValue, darkMode }) => (
  <div className="space-y-4">
    {data.map((room, idx) => (
      <div key={idx} className="flex items-center gap-4 animate-slide-in">
        <span className="w-24 text-sm font-medium">{room.label}</span>
        <div className={`flex-1 h-8 rounded-full relative overflow-hidden shadow-inner ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}>
          <div
            className={`h-8 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-700 hover:from-blue-500 hover:to-indigo-600`}
            style={{ width: `${(room.value / maxValue) * 100}%` }}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-sm font-bold">
            {room.value}
          </span>
        </div>
      </div>
    ))}
    {data.length === 0 && (
      <div className="text-center p-8 rounded-xl bg-gray-100 dark:bg-gray-800">
        <span className="text-4xl mb-2 block">📭</span>
        <p className="text-gray-500 dark:text-gray-400">No tenants found.</p>
      </div>
    )}
  </div>
);



export default function Dashboard() {
  const [tenants, setTenants] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [tenantsData, roomsData] = await Promise.all([api.getTenants(), api.getRooms()]);
      setTenants(tenantsData);
      setRooms(roomsData);
    } catch (err) {
      setError("Failed to load data. Retrying in 5 seconds...");
      console.error("Dashboard load error:", err);
      setTimeout(loadData, 5000);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(loadData, 30000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, loadData]);

  useEffect(() => {
    document.body.className = darkMode ? "dark bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white" : "bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 text-gray-900";
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const totalTenants = tenants.length;
  const totalRooms = rooms.length || 24;
  const occupiedRooms = tenants.length;
  const vacantRooms = Math.max(0, totalRooms - occupiedRooms);

  const roomDistribution = useMemo(() => {
    const roomMap = {};
    tenants.forEach(t => {
      roomMap[t.room] = (roomMap[t.room] || 0) + 1;
    });
    return Object.entries(roomMap).map(([room, count]) => ({ label: `Room ${room}`, value: count }));
  }, [tenants]);

  const maxTenantsInRoom = useMemo(() => Math.max(...roomDistribution.map(r => r.value), 1), [roomDistribution]);

  const filteredTenants = useMemo(() =>
    tenants.filter(t => {
      const term = search.toLowerCase();
      return (
        t.name?.toLowerCase().includes(term) ||
        t.room?.toString().toLowerCase().includes(term) ||
        t.contact?.toLowerCase().includes(term)
      );
    }),
    [tenants, search]
  );

  if (loading) {
    return (
      <div className="p-6 md:p-10 flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="animate-pulse space-y-6">
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mx-auto"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array(3).fill().map((_, i) => (
              <div key={i} className="h-24 bg-gray-300 dark:bg-gray-700 rounded-2xl"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-6 md:p-10 space-y-12 min-h-screen transition-all duration-500 ${darkMode ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white" : "bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 text-gray-900"}`}>
      
      <div className="flex flex-col md:flex-row items-center justify-between animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 md:mb-0 flex items-center">
          <span className="mr-4 text-5xl">📊</span>
          Dashboard
        </h1>
        <div className="flex flex-wrap gap-4 items-center">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span className="flex items-center">
              <span className="mr-2">{darkMode ? "☀️" : "🌙"}</span>
              {darkMode ? "Light" : "Dark"}
            </span>
          </button>
          <button
            onClick={loadData}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span className="flex items-center">
              <span className="mr-2">🔄</span>
              Refresh
            </span>
          </button>
          <label className="flex items-center gap-2 bg-white  px-4 py-2 rounded-xl shadow-md">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={() => setAutoRefresh(!autoRefresh)}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">Auto-refresh (30s)</span>
          </label>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-6 py-4 rounded-xl shadow-lg animate-bounce-in text-center">
          ⚠️ {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div className={`p-8 shadow-2xl rounded-3xl border-l-8 border-blue-500 hover:shadow-3xl transition-all duration-300 transform hover:scale-105 animate-fade-in ${darkMode ? "bg-gradient-to-br from-gray-800 to-gray-900" : "bg-gradient-to-br from-white to-gray-50"}`}>
          <h2 className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-wide">Total Tenants</h2>
          <p className="text-4xl font-extrabold mt-3 flex items-center">
            <span className="mr-2 text-3xl">👥</span>
            {totalTenants}
          </p>
        </div>
        <div className={`p-8 shadow-2xl rounded-3xl border-l-8 border-green-500 hover:shadow-3xl transition-all duration-300 transform hover:scale-105 animate-fade-in ${darkMode ? "bg-gradient-to-br from-gray-800 to-gray-900" : "bg-gradient-to-br from-white to-gray-50"}`}>
          <h2 className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-wide">Occupied Rooms</h2>
          <p className="text-4xl font-extrabold mt-3 flex items-center">
            <span className="mr-2 text-3xl">🏠</span>
            {occupiedRooms}
          </p>
        </div>
        <div className={`p-8 shadow-2xl rounded-3xl border-l-8 border-red-500 hover:shadow-3xl transition-all duration-300 transform hover:scale-105 animate-fade-in ${darkMode ? "bg-gradient-to-br from-gray-800 to-gray-900" : "bg-gradient-to-br from-white to-gray-50"}`}>
          <h2 className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-wide">Vacant Rooms</h2>
          <p className="text-4xl font-extrabold mt-3 flex items-center">
            <span className="mr-2 text-3xl">🚪</span>
            {vacantRooms}
          </p>
        </div>
      </div>

      <div className={`shadow-2xl rounded-3xl p-8 hover:shadow-3xl transition-all duration-300 animate-fade-in ${darkMode ? "bg-gradient-to-br from-gray-800 to-gray-900" : "bg-gradient-to-br from-white to-gray-50"}`}>
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <span className="mr-3 text-3xl">📈</span>
          Room Occupancy
        </h2>
        <PieChart occupied={occupiedRooms} vacant={vacantRooms} total={totalRooms} />
      </div>

      <div className={`shadow-2xl rounded-3xl p-8 hover:shadow-3xl transition-all duration-300 animate-fade-in ${darkMode ? "bg-gradient-to-br from-gray-800 to-gray-900" : "bg-gradient-to-br from-white to-gray-50"}`}>
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <span className="mr-3 text-3xl">📊</span>
          Tenant Distribution per Room
        </h2>
        <BarChart data={roomDistribution} maxValue={maxTenantsInRoom} darkMode={darkMode} />
      </div>

      <div className={`shadow-2xl rounded-3xl p-8 hover:shadow-3xl transition-all duration-300 animate-fade-in ${darkMode ? "bg-gradient-to-br from-gray-800 to-gray-900" : "bg-gradient-to-br from-white to-gray-50"}`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold flex items-center">
            <span className="mr-3 text-3xl">👥</span>
            Recent Tenants
          </h2>
        </div>
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="🔍 Search tenants by name, room, or contact..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full p-5 pl-14 border-2 rounded-2xl focus:ring-4 focus:ring-blue-300 transition-all duration-300 shadow-lg ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
          />
          <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-2xl">🔍</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[600px] rounded-2xl overflow-hidden shadow-lg">
            <thead className={`bg-gradient-to-r ${darkMode ? "from-gray-700 to-gray-800" : "from-gray-100 to-gray-200"}`}>
              <tr>
                <th className="p-5 text-left font-semibold text-gray-700 dark:text-gray-300">Name</th>
                <th className="p-5 text-left font-semibold text-gray-700 dark:text-gray-300">Room</th>
                <th className="p-5 text-left font-semibold text-gray-700 dark:text-gray-300">Contact</th>
              </tr>
            </thead>
            <tbody>
              {filteredTenants.slice(0, 10).map((t, idx) => (
                <tr key={t.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 animate-slide-in`} style={{ animationDelay: `${idx * 0.1}s` }}>
                  <td className="p-5 font-medium">{t.name}</td>
                  <td className="p-5">{t.room}</td>
                  <td className="p-5">{t.contact}</td>
                </tr>
              ))}
              {filteredTenants.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center p-8 text-gray-500 dark:text-gray-400">
                    <span className="text-4xl mb-2 block">📭</span>
                    No tenants found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}