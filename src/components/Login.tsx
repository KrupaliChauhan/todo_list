import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const STATIC_USERNAME = "admin";
const STATIC_PASSWORD = "1234";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      setError("All fields are required");
      return;
    }

    if (username !== STATIC_USERNAME || password !== STATIC_PASSWORD) {
      setError("Invalid username or password");
      return;
    }

    // success
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", username);

    navigate("/home");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-3 p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">
          Demo login: admin / 1234
        </p>
      </div>
    </div>
  );
};

export default Login;
