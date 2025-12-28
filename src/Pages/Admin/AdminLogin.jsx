import { useState } from "react";
import './AdminLogin.css'
import API_BASE_URL from "../../api";
function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const API_BASE_URL = "https://creative-studio-backend.onrender.com";
    const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (data.token) {
  localStorage.setItem("token", data.token);
  window.location.href = "/admin/dashboard";
} else {
  alert(data.message || "Login failed");
}};

  return (
    <div className="panel">
      <h2>Admin Login</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password"
             onChange={e => setPassword(e.target.value)} />
      <button onClick={login} className="button">Login</button>
    </div>
  );
}

export default AdminLogin;
