import { useEffect } from "react";

const AboutUs = ({ darkMode }) => {
  useEffect(() => {
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black" : "bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100"} px-8 py-16 transition-all duration-500`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className={`text-6xl md:text-7xl font-extrabold tracking-tight mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
            About <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">GL Residences</span>
          </h1>
          <p className={`mt-6 text-xl md:text-2xl ${darkMode ? "text-gray-300" : "text-gray-600"} max-w-3xl mx-auto leading-relaxed`}>
            A modern apartment management system built for simplicity, clarity, and efficiency.
          </p>
        </div>

        <div className={`bg-gradient-to-br ${darkMode ? "from-gray-800 to-gray-900 border-gray-700" : "from-white to-gray-50 border-gray-200"} rounded-3xl shadow-2xl p-12 md:p-16 border-2 hover:shadow-3xl transition-all duration-500 animate-fade-in`}>
          <p className={`text-lg md:text-xl leading-relaxed mb-16 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            <span className={`font-bold text-2xl ${darkMode ? "text-white" : "text-gray-900"}`}>GL Residences</span> is
            a centralized apartment management platform designed to help
            property owners and administrators manage tenants, rooms, and
            occupancy with ease. Our system focuses on accuracy, automation,
            and a clean user experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className={`p-10 rounded-3xl ${darkMode ? "bg-gradient-to-br from-gray-700 to-gray-800 border-gray-600" : "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200"} border-2 hover:shadow-2xl hover:scale-105 transition-all duration-500 animate-slide-in`}>
              <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                <span className="text-4xl">🎯</span>
                Our Mission
              </h2>
              <p className={`text-lg leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                To streamline apartment operations by providing a reliable and
                easy-to-use system that tracks tenants, room availability, and
                records in one secure platform.
              </p>
            </div>

            <div className={`p-10 rounded-3xl ${darkMode ? "bg-gradient-to-br from-gray-700 to-gray-800 border-gray-600" : "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200"} border-2 hover:shadow-2xl hover:scale-105 transition-all duration-500 animate-slide-in`} style={{ animationDelay: '0.2s' }}>
              <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                <span className="text-4xl">🌟</span>
                Our Vision
              </h2>
              <p className={`text-lg leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                To become a trusted management solution for small to medium
                residential properties by combining smart automation with a
                clean and intuitive interface.
              </p>
            </div>
          </div>

          <div className={`border-t-2 pt-16 ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
            <h2 className={`text-4xl font-bold mb-12 text-center ${darkMode ? "text-white" : "text-gray-900"} animate-bounce-in`}>
              What This System Offers
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className={`p-8 rounded-3xl ${darkMode ? "bg-gradient-to-br from-blue-900/20 to-blue-800/20 border-blue-700/50" : "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"} border-2 text-center hover:shadow-2xl hover:scale-105 transition-all duration-500 animate-slide-in`} style={{ animationDelay: '0.4s' }}>
                <div className="text-5xl mb-6">🏠</div>
                <h3 className={`font-bold text-xl mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Room Management
                </h3>
                <p className={`text-base leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Organized rooms by floor with automatic occupancy status.
                </p>
              </div>

              <div className={`p-8 rounded-3xl ${darkMode ? "bg-gradient-to-br from-green-900/20 to-green-800/20 border-green-700/50" : "bg-gradient-to-br from-green-50 to-green-100 border-green-200"} border-2 text-center hover:shadow-2xl hover:scale-105 transition-all duration-500 animate-slide-in`} style={{ animationDelay: '0.6s' }}>
                <div className="text-5xl mb-6">👥</div>
                <h3 className={`font-bold text-xl mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Tenant Tracking
                </h3>
                <p className={`text-base leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Assign tenants to rooms with real-time updates.
                </p>
              </div>

              <div className={`p-8 rounded-3xl ${darkMode ? "bg-gradient-to-br from-purple-900/20 to-purple-800/20 border-purple-700/50" : "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200"} border-2 text-center hover:shadow-2xl hover:scale-105 transition-all duration-500 animate-slide-in`} style={{ animationDelay: '0.8s' }}>
                <div className="text-5xl mb-6">⚡</div>
                <h3 className={`font-bold text-xl mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Smart Automation
                </h3>
                <p className={`text-base leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Automatic room occupancy updates when tenants are added or removed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;