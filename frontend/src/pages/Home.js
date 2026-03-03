import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

export default function Home() {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [stats, setStats] = useState({ total: 0, upcoming: 0, categories: 0 });

  useEffect(() => {
    api.get("/events").then(res => {
      const events = res.data;
      setFeaturedEvents(events.filter(e => e.featured).slice(0, 3));
      setStats({
        total: events.length,
        upcoming: events.filter(e => new Date(e.date) > new Date()).length,
        categories: new Set(events.map(e => e.category)).size
      });
    });
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="text-white text-center py-5" style={{background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", minHeight: "500px", display: "flex", alignItems: "center"}}>
        <div className="container">
          <h1 className="display-3 fw-bold mb-4">🎓 Campus Event Hub</h1>
          <p className="lead fs-4 mb-4">Discover, Register & Participate in Amazing College Events</p>
          
          <div className="d-flex justify-content-center gap-3 mb-5">
            <Link to="/events" className="btn btn-warning btn-lg px-5 shadow">
              🔍 Explore Events
            </Link>
            <Link to="/register" className="btn btn-outline-light btn-lg px-5">
              ✨ Get Started
            </Link>
          </div>

          {/* Stats */}
          <div className="row mt-5">
            <div className="col-md-4">
              <div className="bg-white bg-opacity-25 rounded p-4">
                <h2 className="fw-bold">{stats.total}+</h2>
                <p className="mb-0">Total Events</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="bg-white bg-opacity-25 rounded p-4">
                <h2 className="fw-bold">{stats.upcoming}+</h2>
                <p className="mb-0">Upcoming Events</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="bg-white bg-opacity-25 rounded p-4">
                <h2 className="fw-bold">{stats.categories}+</h2>
                <p className="mb-0">Categories</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Events */}
      <div className="container py-5">
        <h2 className="text-center mb-4 fw-bold">⭐ Featured Events</h2>
        <div className="row">
          {featuredEvents.map(evt => (
            <div className="col-md-4 mb-4" key={evt._id}>
              <div className="card h-100 shadow-sm hover-shadow">
                <img src={evt.image} className="card-img-top" alt={evt.title} style={{height: 200, objectFit: "cover"}} />
                <div className="card-body">
                  <span className="badge bg-warning text-dark mb-2">{evt.category}</span>
                  <h5 className="card-title">{evt.title}</h5>
                  <p className="text-muted small">{evt.description?.substring(0, 80)}...</p>
                  <p className="mb-0"><small>📅 {new Date(evt.date).toLocaleDateString()}</small></p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link to="/events" className="btn btn-primary btn-lg">View All Events →</Link>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4 fw-bold">Event Categories</h2>
          <div className="row text-center">
            <div className="col-md-3 mb-3">
              <div className="card shadow-sm p-4 h-100">
                <div className="fs-1 mb-3">🤖</div>
                <h5>AI & ML</h5>
                <p className="text-muted small">Artificial Intelligence Events</p>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card shadow-sm p-4 h-100">
                <div className="fs-1 mb-3">💻</div>
                <h5>Technical</h5>
                <p className="text-muted small">Workshops & Seminars</p>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card shadow-sm p-4 h-100">
                <div className="fs-1 mb-3">💡</div>
                <h5>Hackathons</h5>
                <p className="text-muted small">Coding Competitions</p>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card shadow-sm p-4 h-100">
                <div className="fs-1 mb-3">🎯</div>
                <h5>Non-Technical</h5>
                <p className="text-muted small">Cultural & Sports Events</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
