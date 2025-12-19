import { useEffect, useState, useMemo } from "react";
import { api } from "../services/api";

const RoomCard = ({ room, isOccupied, onEdit, onView, darkMode }) => (
  <div
    onClick={() => onView(room)}
    className={`shadow-xl rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer transform hover:scale-105 ${darkMode ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700" : "bg-gradient-to-br from-white to-gray-50"} animate-fade-in`}
  >
    <div className="flex justify-between items-start mb-6">
      <h3 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"} flex items-center`}>
        <span className="mr-3 text-3xl">🏠</span>
        Room {room.roomNumber}
      </h3>
      <span className={`px-4 py-2 rounded-full text-sm font-semibold shadow-md ${isOccupied ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
        {isOccupied ? "✅ Occupied" : "🚪 Vacant"}
      </span>
    </div>
    <p className={`text-base mb-3 ${darkMode ? "text-gray-300" : "text-gray-600"} flex items-center`}>
      <span className="mr-2">🏢</span>
      Floor: {room.floor}
    </p>
    <p className={`text-base mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"} flex items-center`}>
      <span className="mr-2">💰</span>
      Rate: ₱{room.rate}
    </p>
    <div className="flex gap-3">
      <button
        onClick={(e) => { e.stopPropagation(); onEdit(room); }}
        className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
        aria-label={`Edit Room ${room.roomNumber}`}
      >
        ✏️ Edit
      </button>
    </div>
  </div>
);

const EditModal = ({ room, form, setForm, onUpdate, onClose, darkMode }) => {
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); if (!form.roomNumber || !form.floor || form.rate < 0) return; onUpdate(); };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
      <div className={`relative w-full max-w-lg p-8 rounded-3xl shadow-2xl transition-all duration-500 transform scale-100 hover:scale-105 ${darkMode ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700" : "bg-gradient-to-br from-white to-gray-50"}`} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 text-2xl transition-colors duration-200" aria-label="Close Modal">✕</button>
        <h2 className={`text-3xl font-bold mb-8 ${darkMode ? "text-white" : "text-gray-800"} flex items-center`}>
          <span className="mr-3">✏️</span>
          Edit Room
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label className={`block text-sm font-semibold mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Room Number</label>
            <div className="relative">
              <input
                type="text"
                name="roomNumber"
                value={form.roomNumber}
                onChange={handleChange}
                required
                className={`w-full p-4 pl-12 border-2 rounded-xl focus:ring-4 focus:ring-blue-300 transition-all duration-300 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-50 border-gray-300"}`}
                placeholder="e.g., 101"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">🏠</span>
            </div>
          </div>
          <div className="relative">
            <label className={`block text-sm font-semibold mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Floor</label>
            <div className="relative">
              <input
                type="number"
                name="floor"
                value={form.floor}
                min={1}
                max={3}
                onChange={handleChange}
                required
                className={`w-full p-4 pl-12 border-2 rounded-xl focus:ring-4 focus:ring-blue-300 transition-all duration-300 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-50 border-gray-300"}`}
                placeholder="e.g., 1"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">🏢</span>
            </div>
          </div>
          <div className="relative">
            <label className={`block text-sm font-semibold mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Rate</label>
            <div className="relative">
              <input
                type="number"
                name="rate"
                value={form.rate}
                min={0}
                onChange={handleChange}
                required
                className={`w-full p-4 pl-12 border-2 rounded-xl focus:ring-4 focus:ring-blue-300 transition-all duration-300 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-50 border-gray-300"}`}
                placeholder="e.g., 5000"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">💰</span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold text-lg"
          >
            <span className="flex items-center justify-center">
              <span className="mr-3">✨</span>
              Update Room
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

const TenantDetailsModal = ({ tenants, room, onClose, darkMode }) => {
  const roomTenants = tenants.filter(t => t.room === room.roomNumber);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
      <div className={`relative w-full max-w-xl p-8 rounded-3xl shadow-2xl transition-all duration-500 transform scale-100 hover:scale-105 ${darkMode ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700" : "bg-gradient-to-br from-white to-gray-50"}`} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 text-2xl transition-colors duration-200" aria-label="Close Modal">✕</button>
        <h2 className={`text-3xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-800"} flex items-center`}>
          <span className="mr-3">👥</span>
          Room {room.roomNumber} - Tenant Details
        </h2>
        {roomTenants.length > 0 ? (
          <ul className="space-y-4">
            {roomTenants.map(t => (
              <li key={t.id} className={`p-5 rounded-xl border-2 shadow-md transition-all duration-300 hover:shadow-lg ${darkMode ? "bg-gradient-to-r from-gray-700 to-gray-800 border-gray-600 text-white" : "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200"} animate-slide-in`}>
                <p className="flex items-center mb-2">
                  <span className="mr-2 text-xl">👤</span>
                  <strong>Name: </strong> {t.name}
                </p>
                <p className="flex items-center">
                  <span className="mr-2 text-xl">📞</span>
                  <strong>Contact: </strong> {t.contact}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className={`text-center p-8 rounded-xl ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"}`}>
            <span className="text-4xl mb-4 block">🚫</span>
            <p className="text-lg">No tenants assigned to this room.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [form, setForm] = useState({ roomNumber: "", floor: 1, rate: 0 });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [viewTenantRoom, setViewTenantRoom] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all"); 

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const [roomsData, tenantsData] = await Promise.all([api.getRooms(), api.getTenants()]);
      setRooms(roomsData);
      setTenants(tenantsData);
    } catch (err) {
      setError("Failed to load rooms. Please try again.");
      console.error("Failed to load data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);
  useEffect(() => { document.body.className = darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-900"; localStorage.setItem("darkMode", darkMode); }, [darkMode]);

  const filteredRooms = useMemo(() => {
    let filtered = rooms.filter(room => room.roomNumber.toLowerCase().includes(search.toLowerCase()) || room.floor.toString().includes(search));
    if (filterStatus === "occupied") filtered = filtered.filter(room => isOccupied(room.roomNumber));
    else if (filterStatus === "vacant") filtered = filtered.filter(room => !isOccupied(room.roomNumber));
    return filtered;
  }, [rooms, search, filterStatus]);

  const isOccupied = (roomNumber) => tenants.some(t => t.room === roomNumber);

  const editRoom = (room) => { setSelectedRoom(room); setForm({ ...room }); };
  const updateRoom = async () => { if (!selectedRoom) return; try { await api.updateRoom(selectedRoom.id, form); setForm({ roomNumber: "", floor: 1, rate: 0 }); setSelectedRoom(null); loadData(); } catch (err) { setError("Failed to update room."); console.error(err); } };
  const closeModal = () => { setSelectedRoom(null); setForm({ roomNumber: "", floor: 1, rate: 0 }); };
  const closeTenantModal = () => setViewTenantRoom(null);

  return (
    <div className={`p-6 md:p-10 min-h-screen transition-all duration-500 ${darkMode ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black" : "bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100"}`}>
      <div className="flex justify-between items-center mb-10">
        <h1 className={`text-5xl font-extrabold ${darkMode ? "text-white" : "text-gray-800"} animate-bounce-in`}>
          🏢 Rooms Management
        </h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-3 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 transition-all duration-300 transform hover:scale-110 shadow-lg"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      {error && (
        <div className={`mb-8 p-5 rounded-xl text-center shadow-lg animate-bounce-in ${darkMode ? "bg-red-900 text-red-300" : "bg-red-100 text-red-700"}`}>
          ⚠️ {error}
          <button onClick={loadData} className="underline ml-3 font-semibold hover:text-red-500 transition-colors">Retry</button>
        </div>
      )}

      <div className="mb-10 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="🔍 Search rooms by number or floor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full p-5 pl-14 border-2 rounded-2xl focus:ring-4 focus:ring-blue-300 transition-all duration-300 shadow-lg ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
            aria-label="Search Rooms"
          />
          <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-2xl">🔍</span>
        </div>
        
      </div>

      {loading ? (
        <div className="text-center p-12">
          <div className="animate-spin h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
          <p className={`text-xl ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Loading rooms...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.length > 0 ? filteredRooms.map(room => (
            <RoomCard
              key={room.id}
              room={room}
              isOccupied={isOccupied(room.roomNumber)}
              onEdit={editRoom}
              onView={setViewTenantRoom}
              darkMode={darkMode}
            />
          )) : (
            <div className={`col-span-full text-center p-12 rounded-3xl shadow-xl ${darkMode ? "bg-gradient-to-br from-gray-800 to-gray-900" : "bg-gradient-to-br from-white to-gray-50"}`}>
              <span className="text-6xl mb-4 block">📭</span>
              <p className={`text-xl ${darkMode ? "text-gray-400" : "text-gray-500"}`}>No rooms found. Try adjusting your search or filter.</p>
            </div>
          )}
        </div>
      )}

      {selectedRoom && <EditModal room={selectedRoom} form={form} setForm={setForm} onUpdate={updateRoom} onClose={closeModal} darkMode={darkMode} />}
      {viewTenantRoom && <TenantDetailsModal room={viewTenantRoom} tenants={tenants} onClose={closeTenantModal} darkMode={darkMode} />}
    </div>
  );
};

export default Rooms;