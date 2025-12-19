import { useState, useEffect } from "react";
import { API_URL } from "../config/constants";
import { useNavigate } from "react-router-dom";
import GL from "/src/assets/images/GL.png";
import Logo from "/src/assets/images/Logo.png";

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

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-900";
  }, [darkMode]);

  async function handleRegister(e) {
  }
}