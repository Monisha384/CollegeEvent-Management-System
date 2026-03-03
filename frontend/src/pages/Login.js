import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("✅ Login successful!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">🔐</div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Login to access your account</p>
        </div>
        
        {error && (
          <div className="auth-alert error">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}
        
        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              className="form-input" 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={e => setEmail(e.target.value)} 
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input 
              className="form-input" 
              type="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={e => setPassword(e.target.value)} 
              required
            />
          </div>
          
          <button 
            className="auth-btn" 
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Logging in...
              </>
            ) : (
              "Login to Account"
            )}
          </button>
        </form>
        
        <div className="auth-footer">
          Don't have an account? <Link to="/register">Create Account</Link>
        </div>
      </div>
    </div>
  );
}
