import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../config/constants";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import GL from "/src/assets/images/GL.png";
import Logo from "/src/assets/images/Logo.png";

const FormField = ({ label, type, value, onChange, required, icon, darkMode }) => (
  <div className="relative">
    <input
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className={`peer w-full p-4 pt-6 border rounded-lg outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white/70"}`}
      aria-label={label}
    />
    <label className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-600 peer-valid:text-xs peer-valid:top-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
      {label}
    </label>
    {icon && <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-lg ${darkMode ? "text-gray-400" : "text-gray-400"}`}>{icon}</span>}
  </div>
);

const PasswordField = ({ label, value, onChange, showPassword, setShowPassword, darkMode }) => (
  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      value={value}
      onChange={onChange}
      required
      className={`peer w-full p-4 pt-6 border rounded-lg outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white/70"}`}
      aria-label={label}
    />
    <label className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-600 peer-valid:text-xs peer-valid:top-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
      {label}
    </label>
    <span
      onClick={() => setShowPassword(!showPassword)}
      className={`absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-lg hover:text-gray-600 select-none ${darkMode ? "text-gray-400" : "text-gray-400"}`}
      aria-label="Toggle password visibility"
    >
      {showPassword ? "🙈" : "👁️"}
    </span>
  </div>
);

const PasswordStrength = ({ password }) => {
  const strength = password.length < 6 ? 0 : password.length < 8 ? 1 : password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/) ? 3 : 2;
  const colors = ["bg-red-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"];
  const labels = ["Weak", "Fair", "Good", "Strong"];
  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {Array(4).fill().map((_, i) => (
          <div key={i} className={`h-2 flex-1 rounded ${i <= strength ? colors[strength] : "bg-gray-300"}`}></div>
        ))}
      </div>
      <p className={`text-xs mt-1 ${colors[strength].replace("bg-", "text-")}`}>{labels[strength]}</p>
    </div>
  );
};

export default function Login() {
  const [username, setUsername] = useState(localStorage.getItem("remember_username") || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(!!localStorage.getItem("remember_username"));
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    document.body.className = darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-900";
  }, [darkMode]);

  const handleLogin = useCallback(async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error("Invalid Credentials");
      const data = await res.json();
      login(data.token);
      if (remember) localStorage.setItem("remember_username", username);
      else localStorage.removeItem("remember_username");
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [username, password, remember, login, navigate]);

  const handleRegister = useCallback(async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Registration failed");
      }
      alert("Registration successful! You can now log in.");
      setIsRegistering(false);
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [username, password, confirmPassword]);

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setError("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className={`min-h-screen flex transition-colors ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img src={GL} className="w-full h-full object-cover brightness-75" alt="GL Residences Background" />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
        <div className="absolute bottom-16 left-12 text-white space-y-4 select-none">
          <h1 className="text-5xl font-extrabold drop-shadow-lg">GL Residences</h1>
          <p className="text-lg text-gray-200 max-w-sm leading-relaxed tracking-wide">
            Your Space. Your Style. Your Home.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center w-full lg:w-1/2 p-6">
        <div className="relative group w-full max-w-md">
          <div className={`absolute inset-0 backdrop-blur-xl rounded-3xl shadow-2xl group-hover:shadow-blue-300/40 transition duration-300 ${darkMode ? "bg-gray-800/10" : "bg-white/10"}`}></div>
          <div className={`relative p-10 border rounded-3xl shadow-xl transition-all duration-500 ${darkMode ? "bg-gray-800/95 border-gray-700" : "bg-white/95 border-white"}`}>
            <div className="flex justify-between items-center mb-6">
              <img src={Logo} className="w-20 h-20 rounded-full shadow-md" alt="GL Logo" />
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
            </div>
            <h2 className={`text-3xl font-bold text-center mb-1 tracking-wide ${darkMode ? "text-white" : "text-gray-800"}`}>
              {isRegistering ? "Register" : "Portal"}
            </h2>
            <p className={`text-center mb-8 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              {isRegistering ? "Create your GL Residences account" : "Login to your GL Residences account"}
            </p>
            {error && (
              <div className={`mb-4 p-3 rounded-md text-sm text-center shadow ${darkMode ? "bg-red-900 text-red-300" : "bg-red-100 text-red-700"}`}>
                ⚠️ {error}
              </div>
            )}
            <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-6">
              <FormField
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                icon="👤"
                darkMode={darkMode}
              />
              <PasswordField
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                darkMode={darkMode}
              />
              {isRegistering && <PasswordStrength password={password} />}
              {isRegistering && (
                <PasswordField
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  darkMode={darkMode}
                />
              )}
              {!isRegistering && (
                <div className="flex items-center justify-between text-sm">
                  <label className={`flex items-center gap-2 cursor-pointer ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={() => setRemember(!remember)}
                      className="w-4 h-4 accent-blue-600"
                    />
                    Remember me
                  </label>
                  <span className="text-blue-600 hover:underline cursor-pointer" onClick={() => alert("Forgot password feature coming soon!")}>
                    Forgot password?
                  </span>
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-semibold text-lg shadow-md transition-transform active:scale-95 relative overflow-hidden disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : isRegistering ? "Register" : "Login"}
              </button>
            </form>
            <div
              onClick={toggleMode}
              className={`mt-6 text-center text-sm hover:underline cursor-pointer ${darkMode ? "text-blue-400" : "text-blue-600"}`}
            >
              {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
            </div>
            <div className={`mt-6 text-center text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
              GL Residences • Secure Resident Access
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}