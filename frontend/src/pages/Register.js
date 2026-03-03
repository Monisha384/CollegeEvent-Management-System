import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/register", { name, email, password });
      alert("✅ Registered successfully!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Email may already exist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">🎓</div>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join us to explore amazing events</p>
        </div>
        
        {error && (
          <div className="auth-alert error">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}
        
        <form className="auth-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label>Full Name</label>
            <input 
              className="form-input" 
              placeholder="Enter your full name" 
              value={name}
              onChange={e => setName(e.target.value)} 
              required
            />
          </div>
          
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
              placeholder="Create a strong password" 
              value={password}
              onChange={e => setPassword(e.target.value)} 
              required
              minLength={6}
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
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>
        
        <div className="auth-footer">
          Already have an account? <Link to="/login">Login Here</Link>
        </div>
      </div>
    </div>
  );
}
