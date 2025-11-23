import { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/history/", {
        headers: {
          Authorization: "Basic " + btoa(username + ":" + password)
        }
      });

      if (!res.ok) {
        setError("Invalid username or password");
        return;
      }

      onLogin(username, password);
    } catch {
      setError("Server connection failed");
    }
  };

  return (
    <div className="login-container">

      {/* Title Centered */}
      <h1 className="login-title">Chemical Equipment Parameter Visualizer</h1>

      <div className="login-card">
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}
