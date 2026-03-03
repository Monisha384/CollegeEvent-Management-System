import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setIsLoggedIn(!!token);
    setUserName(user.name || "");
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserName("");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow-sm" style={{background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"}}>
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4" to="/">
          🎓 Campus Events
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/events">🎫 Events</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/live-classes">🔴 Live Classes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/videos">🎥 Videos</Link>
            </li>
            
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/dashboard">📊 Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/my-queries">📝 My Queries</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/manage-queries">🎯 Manage Queries</Link>
                </li>
                {userName && (
                  <li className="nav-item">
                    <span className="nav-link text-white">👤 {userName}</span>
                  </li>
                )}
                <li className="nav-item">
                  <button className="btn btn-danger btn-sm ms-2" onClick={handleLogout}>
                    🚪 Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-warning btn-sm ms-2" to="/register">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
