import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import CountdownTimer from "../components/CountdownTimer";
import "./Events.css";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    console.log("Fetching events from:", api.defaults.baseURL);
    api.get("/events")
      .then(res => {
        console.log("Events received:", res.data.length, "events");
        setEvents(res.data);
        setFilteredEvents(res.data);
      })
      .catch(err => {
        console.error("Error fetching events:", err);
        console.error("Error response:", err.response?.data);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = events;
    
    if (searchTerm) {
      filtered = filtered.filter(evt => 
        evt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evt.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (categoryFilter !== "All") {
      filtered = filtered.filter(evt => evt.category === categoryFilter);
    }

    // Sort
    if (sortBy === "date") {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === "featured") {
      filtered.sort((a, b) => b.featured - a.featured);
    }
    
    setFilteredEvents(filtered);
  }, [searchTerm, categoryFilter, sortBy, events]);

  const categories = ["All", ...new Set(events.map(e => e.category))];

  const handleRegister = (eventId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("⚠️ Please login to register for events");
      navigate("/login");
      return;
    }
    navigate(`/register/${eventId}`);
  };

  return (
    <div className="events-container">
      <div className="container">
        <div className="events-header">
          <h1>🎫 Discover Campus Events</h1>
          <p>Find and register for amazing events happening on campus</p>
        </div>

        <div className="events-filter-card">
          <div className="row g-3">
            <div className="col-md-5">
              <input
                type="text"
                className="form-control filter-input"
                placeholder="🔍 Search events by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <select
                className="form-select filter-select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>🏷️ {cat}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-select filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">📅 By Date</option>
                <option value="featured">⭐ Featured First</option>
              </select>
            </div>
          </div>
          <div className="mt-3">
            <span className="events-count-badge">{filteredEvents.length} Events Found</span>
          </div>
        </div>

        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p className="mt-4 text-muted fs-5">Loading amazing events...</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h4>No events found</h4>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="row">
            {filteredEvents.map(evt => (
              <div className="col-lg-4 col-md-6 mb-4" key={evt._id}>
                <div className="event-card">
                  <div className="event-image-wrapper">
                    <img 
                      src={evt.image} 
                      className="event-image"
                      alt={evt.title}
                    />
                    {evt.featured && (
                      <span className="event-featured-badge">
                        ⭐ Featured
                      </span>
                    )}
                    <div className="event-category-badge">
                      {evt.category}
                    </div>
                  </div>

                  <div className="event-card-body">
                    <h5 className="event-title">{evt.title}</h5>
                    <CountdownTimer eventDate={evt.date} />
                    <p className="event-description">
                      {evt.description?.substring(0, 120)}{evt.description?.length > 120 ? '...' : ''}
                    </p>
                    
                    <div>
                      <div className="event-info-item">
                        <span>📅</span>
                        <span>{new Date(evt.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}</span>
                      </div>
                      <div className="event-info-item">
                        <span>📍</span>
                        <span>{evt.venue}</span>
                      </div>
                      {evt.coordinator && (
                        <>
                          <div className="event-info-item">
                            <span>👤</span>
                            <span>{evt.coordinator}</span>
                          </div>
                          {evt.email && (
                            <div className="event-info-item">
                              <span>✉️</span>
                              <span>{evt.email}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="event-card-footer">
                    <button 
                      className="event-register-btn"
                      onClick={() => handleRegister(evt._id)}
                    >
                      🎫 Register Now
                    </button>
                    {evt.isLive && (
                      <button 
                        className="event-register-btn"
                        style={{background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"}}
                        onClick={() => navigate(`/live/${evt._id}`)}
                      >
                        🔴 Join Live
                      </button>
                    )}
                    <button 
                      className="event-members-btn"
                      onClick={() => navigate(`/members/${evt._id}`)}
                    >
                      👥 Members
                    </button>
                    <button 
                      className="event-members-btn"
                      onClick={() => navigate(`/ask-query/${evt._id}`)}
                    >
                      ❓ Ask
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}