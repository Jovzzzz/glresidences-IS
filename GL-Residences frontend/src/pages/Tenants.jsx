import { useEffect, useState, useMemo } from "react";
import { api } from "../services/api";
import { useNotifications } from "../context/NotificationContext";


const TenantsForm = ({ form, setForm, isEditing, onSubmit, submitting, error, onCancel }) => {
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = "Full name is required.";
    if (!form.room.trim()) errors.room = "Room number is required.";
    if (!form.contact.trim()) errors.contact = "Contact number is required.";
    else if (!/^\d{10,15}$/.test(form.contact.replace(/\D/g, ""))) {
      errors.contact = "Enter a valid phone number (10–15 digits).";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) onSubmit();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "room" && !/^[0-9]*$/.test(value)) return;
    setForm({ ...form, [name]: value });
    if (formErrors[name]) setFormErrors({ ...formErrors, [name]: "" });
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-gray-200 rounded-3xl shadow-2xl p-10 mb-12 transition-all duration-300 hover:shadow-3xl animate-fade-in">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center">
        <span className="mr-3 text-4xl">{isEditing ? "✏️" : "➕"}</span>
        {isEditing ? "Edit Tenant" : "Add New Tenant"}
      </h2>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg mb-6 flex items-center animate-bounce-in">
          <span className="mr-3 text-2xl">⚠️</span>
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="relative group">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Full Name
          </label>
          <div className="relative">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={`w-full p-5 pl-14 border-2 rounded-2xl bg-white focus:ring-4 focus:ring-blue-300 transition-all duration-300 group-hover:shadow-lg ${
                formErrors.name ? "border-red-500 focus:ring-red-300" : "border-gray-300"
              }`}
              placeholder="Enter full name"
            />
            <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">👤</span>
          </div>
          {formErrors.name && (
            <p className="text-red-500 text-sm mt-2 flex items-center animate-slide-in">
              <span className="mr-2">❌</span>
              {formErrors.name}
            </p>
          )}
        </div>

        <div className="relative group">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Room Number
          </label>
          <div className="relative">
            <input
              type="text"
              name="room"
              value={form.room}
              onChange={handleChange}
              className={`w-full p-5 pl-14 border-2 rounded-2xl bg-white focus:ring-4 focus:ring-blue-300 transition-all duration-300 group-hover:shadow-lg ${
                formErrors.room ? "border-red-500 focus:ring-red-300" : "border-gray-300"
              }`}
              placeholder="e.g., 101"
            />
            <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">🏠</span>
          </div>
          {formErrors.room && (
            <p className="text-red-500 text-sm mt-2 flex items-center animate-slide-in">
              <span className="mr-2">❌</span>
              {formErrors.room}
            </p>
          )}
        </div>

        <div className="relative group">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Contact Number
          </label>
          <div className="relative">
            <input
              type="text"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              className={`w-full p-5 pl-14 border-2 rounded-2xl bg-white focus:ring-4 focus:ring-blue-300 transition-all duration-300 group-hover:shadow-lg ${
                formErrors.contact ? "border-red-500 focus:ring-red-300" : "border-gray-300"
              }`}
              placeholder="e.g., +1234567890"
            />
            <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">📞</span>
          </div>
          {formErrors.contact && (
            <p className="text-red-500 text-sm mt-2 flex items-center animate-slide-in">
              <span className="mr-2">❌</span>
              {formErrors.contact}
            </p>
          )}
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className={`px-12 py-4 rounded-2xl font-bold text-white text-lg shadow-xl transform transition-all duration-300 hover:scale-110 ${
            isEditing
              ? "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600"
              : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
          } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
        >
          {submitting ? (
            <span className="flex items-center">
              <div className="animate-spin h-6 w-6 border-b-2 border-white mr-3"></div>
              Processing...
            </span>
          ) : (
            <span className="flex items-center">
              <span className="mr-3 text-xl">{isEditing ? "✏️" : "➕"}</span>
              {isEditing ? "Update Tenant" : "Add Tenant"}
            </span>
          )}
        </button>
        {isEditing && (
          <button
            onClick={onCancel}
            className="px-12 py-4 rounded-2xl font-bold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all duration-300 shadow-lg transform hover:scale-105"
          >
            <span className="flex items-center">
              <span className="mr-3 text-xl">❌</span>
              Cancel
            </span>
          </button>
        )}
      </div>
    </div>
  );
};


const TenantsTable = ({ tenants, onEdit, onDelete, loading, sortBy, setSortBy, sortOrder, setSortOrder }) => {
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const sortedTenants = useMemo(() => {
    return [...tenants].sort((a, b) => {
      const aVal = a[sortBy]?.toString().toLowerCase() || "";
      const bVal = b[sortBy]?.toString().toLowerCase() || "";
      if (sortOrder === "asc") return aVal.localeCompare(bVal);
      return bVal.localeCompare(aVal);
    });
  }, [tenants, sortBy, sortOrder]);

  if (loading) {
    return (
      <div className="bg-white p-10 rounded-3xl shadow-2xl text-center animate-pulse">
        <div className="animate-spin h-12 w-12 border-b-4 border-blue-600 mx-auto mb-6"></div>
        <p className="text-gray-500 text-xl">Loading tenants...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-10 rounded-3xl shadow-2xl overflow-x-auto animate-fade-in">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center">
        <span className="mr-3 text-4xl">📋</span>
        Tenant Records
      </h2>
      <table className="w-full min-w-[650px] table-auto">
        <thead>
          <tr className="bg-gradient-to-r from-gray-100 to-gray-200">
            <th
              className="p-5 text-left font-semibold text-gray-700 cursor-pointer hover:bg-gray-300 transition-colors duration-200"
              onClick={() => handleSort("name")}
            >
              Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="p-5 text-left font-semibold text-gray-700 cursor-pointer hover:bg-gray-300 transition-colors duration-200"
              onClick={() => handleSort("room")}
            >
              Room {sortBy === "room" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="p-5 text-left font-semibold text-gray-700 cursor-pointer hover:bg-gray-300 transition-colors duration-200"
              onClick={() => handleSort("contact")}
            >
              Contact {sortBy === "contact" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th className="p-5 text-center font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedTenants.length ? (
            sortedTenants.map((t) => (
              <tr key={t.id} className="border-b hover:bg-gray-50 transition-all duration-200 animate-slide-in">
                <td className="p-5 text-gray-800 font-medium">{t.name}</td>
                <td className="p-5 text-gray-800">{t.room}</td>
                <td className="p-5 text-gray-800">{t.contact}</td>
                <td className="p-5 text-center space-x-4">
                  <button
                    onClick={() => onEdit(t)}
                    className="bg-blue-500 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-600 transition-all duration-200 transform hover:scale-110 hover:shadow-xl"
                    title="Edit Tenant"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => onDelete(t.id)}
                    className="bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-red-600 transition-all duration-200 transform hover:scale-110 hover:shadow-xl"
                    title="Delete Tenant"
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-10 text-center text-gray-400 italic text-xl">
                <span className="mr-3 text-3xl">📭</span>No tenants found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};


const Tenants = () => {
  const { addNotification } = useNotifications();

  const [tenants, setTenants] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [form, setForm] = useState({ id: null, name: "", room: "", contact: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [editModalOpen, setEditModalOpen] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [t, r] = await Promise.all([api.getTenants(), api.getRooms()]);
      setTenants(t.map((x) => ({ ...x, room: x.room?.toString() || "" })));
      setRooms(r);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const filteredTenants = useMemo(() => {
    const q = debouncedSearch.toLowerCase();
    return tenants.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.room.includes(q) ||
        t.contact.includes(q)
    );
  }, [tenants, debouncedSearch]);

  const resetForm = () => {
    setForm({ id: null, name: "", room: "", contact: "" });
    setIsEditing(false);
    setError("");
    setEditModalOpen(false);
  };

  const occupyRoom = async (roomNumber) => {
    const room = rooms.find((r) => r.roomNumber.toString() === roomNumber);
    if (room && room.status !== "Occupied") {
      await api.updateRoom(room.id, { ...room, status: "Occupied" });
    }
  };

  const addTenant = async () => {
    setSubmitting(true);
    try {
      await api.createTenant({ ...form, room: Number(form.room) });
      await occupyRoom(form.room);
      addNotification(`Tenant "${form.name}" added to Room ${form.room}`);
      resetForm();
      loadData();
    } catch {
      setError("Failed to add tenant.");
    } finally {
      setSubmitting(false);
    }
  };

  const updateTenant = async () => {
    setSubmitting(true);
    try {
      await api.updateTenant(form.id, { ...form, room: Number(form.room) });
      await occupyRoom(form.room);
      addNotification(`Tenant "${form.name}" was updated`);
      resetForm();
      loadData();
    } catch {
      setError("Failed to update tenant.");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteTenant = async (id) => {
    if (!window.confirm("Delete this tenant?")) return;
    const tenant = tenants.find((t) => t.id === id);
    await api.deleteTenant(id);
    addNotification(`Tenant "${tenant?.name}" was removed`);
    loadData();
  };

  const openEditModal = (tenant) => {
    setForm({ ...tenant, room: tenant.room.toString() });
    setIsEditing(true);
    setEditModalOpen(true);
  };

  return (
    <div className="p-10 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 min-h-screen">
      <h1 className="text-6xl font-extrabold mb-12 text-gray-800 text-center animate-bounce-in">
        🏢 Tenant Management
      </h1>

      <div className="relative mb-12">
        <input
          type="text"
          placeholder="🔍 Search tenants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-6 pl-16 rounded-3xl border-2 border-gray-300 bg-white shadow-xl focus:ring-4 focus:ring-blue-300 transition-all duration-300 text-xl hover:shadow-2xl"
        />
        <span className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-2xl">🔍</span>
      </div>

      <TenantsForm
        form={form}
        setForm={setForm}
        isEditing={false}
        onSubmit={addTenant}
        submitting={submitting}
        error={error}
        onCancel={resetForm}
      />

      <TenantsTable
        tenants={filteredTenants}
        onEdit={openEditModal}
        onDelete={deleteTenant}
        loading={loading}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />


      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-10 w-full max-w-3xl shadow-2xl relative animate-slide-in-up">
            <button
              onClick={resetForm}
              className="absolute top-5 right-5 text-gray-500 hover:text-gray-700 text-3xl font-bold"
            >
              &times;
            </button>
            <TenantsForm
              form={form}
              setForm={setForm}
              isEditing={true}
              onSubmit={updateTenant}
              submitting={submitting}
              error={error}
              onCancel={resetForm}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Tenants;
