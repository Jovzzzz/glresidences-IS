import { Menu, Bell, LogOut } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../context/NotificationContext";
import { useState, useRef, useEffect } from "react";

function Header({ onSidebarToggle }) {
  const location = useLocation();
  const { logout } = useAuth();
  const { notifications, markAllAsRead } = useNotifications();

  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const pageTitles = {
    "/": "Dashboard",
    "/tenants": "Tenants",
    "/rooms": "Rooms",
    "/announcements": "Announcements",
    "/about": "About Us",
    "/settings": "Settings",
  };

  const currentTitle = pageTitles[location.pathname] || "Dashboard";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-blue-700 shadow-sm flex items-center px-4 md:px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onSidebarToggle}
          className="p-2 rounded-lg hover:bg-blue-600 transition"
        >
          <Menu size={24} className="text-white" />
        </button>

        <h1 className="text-xl md:text-2xl font-bold text-white">
          {currentTitle}
        </h1>
      </div>

      <div className="flex-1" />

      <div className="relative mr-5" ref={notificationRef}>
        <button
          onClick={() => setShowNotifications(prev => !prev)}
          className="p-2 rounded-lg hover:bg-blue-600 transition relative"
        >
          <Bell size={22} className="text-white" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold rounded-full px-1.5 py-0.5">
              {unreadCount}
            </span>
          )}
        </button>

        {showNotifications && (
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border z-50">
            <div className="flex items-center justify-between px-4 py-2 border-b">
              <span className="font-semibold text-sm">Notifications</span>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Mark all as read
                </button>
              )}
            </div>

            <div className="max-h-64 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="p-4 text-sm text-gray-500 text-center">
                  No notifications
                </p>
              ) : (
                notifications.map(note => (
                  <div
                    key={note.id}
                    className={`px-4 py-3 text-sm border-b last:border-b-0 ${
                      note.read ? "bg-white" : "bg-blue-50"
                    }`}
                  >
                    {note.message}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white">
          <img
            src="https://ui-avatars.com/api/?name=JV&background=2563EB&color=fff"
            alt="User Avatar"
          />
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold"
        >
          <LogOut size={16} />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
