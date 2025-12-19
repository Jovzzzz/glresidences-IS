import { useEffect, useState } from "react";
import { api } from "../services/api";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [form, setForm] = useState({ id: null, title: "", description: "", date: "" });
  const [isEditing, setIsEditing] = useState(false);

  const loadAnnouncements = async () => {
    try {
      const data = await api.getAnnouncements(); // backend returns { id, title, body, postedAt }
      setAnnouncements(data);
    } catch (err) {
      console.error("Failed to load announcements:", err);
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addAnnouncement = async () => {
    if (!form.title || !form.description) return;

    try {
      const payload = {
        title: form.title,
        body: form.description, 
      };
      await api.createAnnouncement(payload);
      setForm({ id: null, title: "", description: "", date: "" });
      loadAnnouncements();
    } catch (err) {
      console.error("Failed to create announcement:", err);
    }
  };

  const editAnnouncement = (a) => {
    setForm({
      id: a.id,
      title: a.title || "",
      description: a.body || "", 
      date: a.postedAt ? a.postedAt.split("T")[0] : "", // yyyy-mm-dd for <input type="date">
    });
    setIsEditing(true);
  };

  const updateAnnouncement = async () => {
    try {
      const payload = {
        title: form.title,
        body: form.description,
      };
      await api.updateAnnouncement(form.id, payload);
      setForm({ id: null, title: "", description: "", date: "" });
      setIsEditing(false);
      loadAnnouncements();
    } catch (err) {
      console.error("Failed to update announcement:", err);
    }
  };

  const deleteAnnouncement = async (id) => {
    try {
      await api.deleteAnnouncement(id);
      loadAnnouncements();
    } catch (err) {
      console.error("Failed to delete announcement:", err);
    }
  };

  const formatDate = (postedAt) => {
    if (!postedAt) return "—";
    const d = new Date(postedAt);
    if (isNaN(d)) return "—";
    return d.toLocaleDateString();
  };

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Announcements</h1>

      <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {isEditing ? "Edit Announcement" : "Add New Announcement"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={isEditing ? updateAnnouncement : addAnnouncement}
            className={`px-6 py-3 rounded-xl font-semibold text-white shadow-md transition
              ${isEditing ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {isEditing ? "Update" : "Add"}
          </button>
        </div>
        
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-6 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Announcements Records</h2>

        <table className="w-full min-w-[600px] border-collapse rounded-lg">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm md:text-base">
            <tr>
              <th className="p-3 border-b">Title</th>
              <th className="p-3 border-b">Description</th>
              <th className="p-3 border-b">Date</th>
              <th className="p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {announcements.length > 0 ? (
              announcements.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50 transition">
                  <td className="p-3 border-b">{a.title}</td>
                  <td className="p-3 border-b">{a.body || "—"}</td>
                  <td className="p-3 border-b">{formatDate(a.postedAt)}</td>
                  <td className="p-3 border-b text-center space-x-2">
                    <button
                      onClick={() => editAnnouncement(a)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteAnnouncement(a.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-400">
                  No announcements found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Announcements;
