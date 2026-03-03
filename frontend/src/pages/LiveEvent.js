import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function LiveEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const res = await api.get(`/events/${id}`);
      setEvent(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getEmbedUrl = (url) => {
    if (!url) return null;
    
    // YouTube
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.includes("youtu.be") 
        ? url.split("youtu.be/")[1]?.split("?")[0]
        : url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    return url;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container py-5 text-center">
        <h3>Event not found</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/events")}>
          Back to Events
        </button>
      </div>
    );
  }

  const embedUrl = getEmbedUrl(event.liveStreamUrl);
  const isGoogleMeet = event.liveStreamUrl?.includes("meet.google.com");

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 className="fw-bold mb-2">🔴 {event.title}</h3>
                    <p className="text-muted mb-0">
                      {event.isLive ? (
                        <span className="badge bg-danger">🔴 LIVE NOW</span>
                      ) : (
                        <span className="badge bg-secondary">Offline</span>
                      )}
                    </p>
                  </div>
                  <button className="btn btn-outline-primary" onClick={() => navigate("/events")}>
                    ← Back to Events
                  </button>
                </div>
              </div>
            </div>

            {!event.liveStreamUrl ? (
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center py-5">
                  <div className="fs-1 mb-3">📺</div>
                  <h5>No Live Stream Available</h5>
                  <p className="text-muted">This event doesn't have a live stream link yet.</p>
                </div>
              </div>
            ) : isGoogleMeet ? (
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center py-5">
                  <div className="fs-1 mb-4">🎥</div>
                  <h4 className="fw-bold mb-3">Join Google Meet</h4>
                  <p className="text-muted mb-4">Click the button below to join the live meeting</p>
                  <a
                    href={event.liveStreamUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-success btn-lg"
                  >
                    📹 Join Live Meeting
                  </a>
                </div>
              </div>
            ) : embedUrl ? (
              <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                  <div className="ratio ratio-16x9">
                    <iframe
                      src={embedUrl}
                      title="Live Stream"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ border: "none" }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center py-5">
                  <div className="fs-1 mb-4">🔗</div>
                  <h4 className="fw-bold mb-3">External Stream</h4>
                  <p className="text-muted mb-4">Click the button below to open the live stream</p>
                  <a
                    href={event.liveStreamUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-lg"
                  >
                    🔴 Open Live Stream
                  </a>
                </div>
              </div>
            )}

            <div className="card border-0 shadow-sm mt-4">
              <div className="card-body">
                <h5 className="fw-bold mb-3">📋 Event Details</h5>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <strong>📅 Date:</strong>
                    <p className="mb-0">{new Date(event.date).toLocaleString()}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>📍 Venue:</strong>
                    <p className="mb-0">{event.venue}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>🏷️ Category:</strong>
                    <p className="mb-0">{event.category}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>👤 Coordinator:</strong>
                    <p className="mb-0">{event.coordinator}</p>
                  </div>
                  <div className="col-12">
                    <strong>📝 Description:</strong>
                    <p className="mb-0">{event.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
