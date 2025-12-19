import { Link, useLocation } from "react-router-dom";
import Logo from "/src/assets/images/Logo.png";

function Sidebar({ isOpen, darkMode }) {
  const location = useLocation();

  const menuItems = [
    { icon: "🏠", text: "Home", link: "/" },
    { icon: "📊", text: "Dashboard", link: "/dashboard" },
    { icon: "👥", text: "Tenants", link: "/tenants" },
    { icon: "🏢", text: "Rooms", link: "/rooms" },
    { icon: "📞", text: "Contact Us", link: "/contacts"},
    { icon: "ℹ️", text: "About Us", link: "/about" },
  ];

  return (
    <div
      className={`
        ${isOpen ? "w-30" : "w-0"}
        ${darkMode ? "bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white border-r border-gray-700" : "bg-gradient-to-b from-blue-700 via-blue-600 to-blue-800 text-white border-r border-blue-800"}
        transition-all duration-500 ease-in-out
        overflow-hidden h-full flex flex-col shadow-2xl backdrop-blur-lg
      `}
    >
      <div className={`p-2 border-b ${darkMode ? "border-gray-700 bg-gray-800/60" : "border-blue-800 bg-blue-800/40"} backdrop-blur-md flex items-center gap-4 animate-fade-in`}>
        <img src={Logo} alt="GL Logo" className="h-12 w-12 object-contain rounded-full shadow-lg ring-2 ring-white/20" />
        <h2 className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          GL Residences
        </h2>
      </div>

      <nav className="mt-8 flex-1 px-6">
        <ul className="space-y-4">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.link;

            return (
              <li key={index} className="animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <Link
                  to={item.link}
                  className={`
                    flex items-center gap-4 px-6 py-4 rounded-2xl text-base font-semibold
                    transition-all duration-300 transform
                    ${isActive
                      ? `${darkMode ? "bg-gradient-to-r from-gray-700 to-gray-600 shadow-2xl scale-105" : "bg-gradient-to-r from-blue-900 to-blue-800 shadow-2xl scale-105"} font-bold ring-2 ring-white/30`
                      : `hover:${darkMode ? "bg-gray-700" : "bg-blue-800"} hover:scale-105 hover:shadow-xl`
                    }
                  `}
                >
                  <span className="text-2xl drop-shadow-md">{item.icon}</span>
                  <span className="drop-shadow-md">{item.text}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={`p-4 border-t ${darkMode ? "border-gray-700 bg-gray-800/60" : "border-blue-800 bg-blue-800/40"} text-sm text-gray-300 opacity-90 backdrop-blur-md flex items-center justify-center gap-2`}>
        <span className="text-xl">🏠</span>
        <span>© 2025 GL Residences</span>
      </div>
    </div>
  );
}

export default Sidebar;