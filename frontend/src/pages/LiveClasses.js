import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function LiveClasses() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLiveEvents();
    const interval = setInterval(fetchLiveEvents, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchLiveEvents = async () => {
    try {
      const res = await api.get("/events");
      const liveEvents = res.data.filter(evt => evt.isLive || evt.liveStreamUrl);
      setEvents(liveEvents);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", minHeight: "100vh", paddingTop: "40px", paddingBottom: "40px" }}>
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="fw-bold text-white mb-3" style={{ fontSize: "48px" }}>
            🔴 Live Classes & Events
          </h1>
          <p className="text-white" style={{ fontSize: "18px", opacity: 0.9 }}>
            Join ongoing live sessions and watch recorded events
          </p>
        </div>

        {events.length === 0 ? (
          <div className="card border-0 shadow-lg" style={{ borderRadius: "20px" }}>
            <div className="card-body text-center py-5">
              <div style={{ fontSize: "80px" }}>📺</div>
              <h3 className="mt-4 mb-3">No Live Events Right Now</h3>
              <p className="text-muted mb-4">Check back later for live streaming events</p>
              <button className="btn btn-primary btn-lg" onClick={() => navigate("/events")}>
                Browse All Events
              </button>
            </div>
          </div>
        ) : (
          <div className="row">
            {events.map((evt) => (
              <div className="col-lg-6 mb-4" key={evt._id}>
                <div className="card border-0 shadow-lg h-100" style={{ borderRadius: "20px", overflow: "hidden" }}>
                  {evt.isLive && (
                    <div style={{
                      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                      padding: "10px 20px",
                      textAlign: "center"
                    }}>
                      <span className="text-white fw-bold">
                        🔴 LIVE NOW
                      </span>
                    </div>
                  )}
                  
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h4 className="fw-bold mb-2">{evt.title}</h4>
                        <span className="badge" style={{
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          color: "white",
                          padding: "8px 15px",
                          borderRadius: "20px"
                        }}>
                          {evt.category}
                        </span>
                      </div>
                    </div>

                    <p className="text-muted mb-3">{evt.description?.substring(0, 150)}...</p>

                    <div className="mb-3">
                      <div className="d-flex align-items-center mb-2">
                        <span className="me-2">📅</span>
                        <span>{new Date(evt.date).toLocaleDateString('en-US', { 
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <span className="me-2">⏰</span>
                        <span>{new Date(evt.date).toLocaleTimeString('en-US', { 
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</span>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <span className="me-2">📍</span>
                        <span>{evt.venue}</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="me-2">👤</span>
                        <span>{evt.coordinator}</span>
                      </div>
                    </div>

                    {evt.liveStreamUrl && (
                      <div className="alert alert-info mb-3">
                        <small>
                          <strong>Platform:</strong> {
                            evt.liveStreamUrl.includes("youtube") ? "YouTube Live" :
                            evt.liveStreamUrl.includes("meet.google") ? "Google Meet" :
                            "Online Stream"
                          }
                        </small>
                      </div>
                    )}

                    <div className="d-grid gap-2">
                      <button
                        className="btn btn-lg fw-bold"
                        style={{
                          background: evt.isLive 
                            ? "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          color: "white",
                          border: "none",
                          borderRadius: "12px",
                          padding: "15px"
                        }}
                        onClick={() => navigate(`/live/${evt._id}`)}
                      >
                        {evt.isLive ? "🔴 Join Live Now" : "📺 Watch Stream"}
                      </button>
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => navigate(`/register/${evt._id}`)}
                      >
                        📝 Register for Event
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-5">
          <button className="btn btn-light btn-lg" onClick={() => navigate("/events")}>
            ← Back to All Events
          </button>
        </div>
      </div>
    </div>
  );
}
