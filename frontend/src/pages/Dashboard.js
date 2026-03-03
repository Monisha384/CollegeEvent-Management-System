import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [stats, setStats] = useState({ total: 0, upcoming: 0, past: 0, featured: 0, students: 0, revenue: 0 });
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(userData);

    api.get("/events").then(res => {
      const eventsData = res.data;
      setEvents(eventsData);
      
      const now = new Date();
      setStats(prev => ({
        ...prev,
        total: eventsData.length,
        upcoming: eventsData.filter(e => new Date(e.date) > now).length,
        past: eventsData.filter(e => new Date(e.date) <= now).length,
        featured: eventsData.filter(e => e.featured).length
      }));
    });

    api.get("/registrations").then(res => {
      const regsData = res.data;
      setRegistrations(regsData);
      setStats(prev => ({
        ...prev,
        students: regsData.length,
        revenue: regsData.length * 100
      }));
    });
  }, [navigate]);

  return (
    <div className="bg-light min-vh-100">
      <div className="container py-5">
        {/* Header */}
        <div className="mb-4">
          <h2 className="fw-bold mb-1">📊 Dashboard</h2>
          <p className="text-muted mb-0">Welcome back, {user?.name || "Admin"}!</p>
        </div>

        {/* Stats Cards */}
        <div className="row mb-4">
          <div className="col-md-3 col-sm-6 mb-3">
            <div className="card border-0 shadow-sm h-100" style={{background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"}}>
              <div className="card-body text-white text-center">
                <div className="fs-1 mb-2">🎫</div>
                <h3 className="fw-bold">{stats.total}</h3>
                <p className="mb-0">Total Events</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3">
            <div className="card border-0 shadow-sm h-100" style={{background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"}}>
              <div className="card-body text-white text-center">
                <div className="fs-1 mb-2">🕒</div>
                <h3 className="fw-bold">{stats.upcoming}</h3>
                <p className="mb-0">Upcoming</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3">
            <div className="card border-0 shadow-sm h-100" style={{background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"}}>
              <div className="card-body text-white text-center">
                <div className="fs-1 mb-2">👥</div>
                <h3 className="fw-bold">{stats.students}</h3>
                <p className="mb-0">Registered Students</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3">
            <div className="card border-0 shadow-sm h-100" style={{background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"}}>
              <div className="card-body text-white text-center">
                <div className="fs-1 mb-2">💰</div>
                <h3 className="fw-bold">₹{stats.revenue}</h3>
                <p className="mb-0">Total Revenue</p>
              </div>
            </div>
          </div>
        </div>

        {/* Events Table */}
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white py-3">
            <h5 className="mb-0 fw-bold">All Events</h5>
          </div>
          <div className="card-body p-0">
            {events.length === 0 ? (
              <div className="text-center py-5">
                <div className="fs-1 mb-3">📄</div>
                <p className="text-muted">No events available.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Date</th>
                      <th>Venue</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map(evt => (
                      <tr key={evt._id}>
                        <td>
                          <img 
                            src={evt.image} 
                            alt={evt.title} 
                            style={{width: 60, height: 60, objectFit: "cover", borderRadius: "8px"}} 
                          />
                        </td>
                        <td>
                          <div className="fw-bold">{evt.title}</div>
                          {evt.featured && <span className="badge bg-warning text-dark">⭐ Featured</span>}
                        </td>
                        <td><span className="badge bg-secondary">{evt.category}</span></td>
                        <td>{new Date(evt.date).toLocaleDateString()}</td>
                        <td>{evt.venue}</td>
                        <td>
                          {new Date(evt.date) > new Date() ? (
                            <span className="badge bg-success">Upcoming</span>
                          ) : (
                            <span className="badge bg-secondary">Completed</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
