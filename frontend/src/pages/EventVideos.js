import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EventVideos.css";

export default function EventVideos() {
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoClick = (video) => {
    if (video.platform === "instagram") {
      window.open(video.videoUrl, "_blank");
    } else {
      setSelectedVideo(video);
    }
  };

  const videos = [
    {
      id: 1,
      title: "National Hackathon 2026 Highlights",
      thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400",
      videoUrl: "https://www.instagram.com/reel/DUGDXx9Dckj/",
      category: "Hackathon",
      duration: "5:30",
      views: "1.2K",
      platform: "instagram"
    },
    {
      id: 2,
      title: "AI & ML Summit - Expert Talks",
      thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400",
      videoUrl: "https://www.youtube.com/embed/m23DZiN4djs",
      category: "Technical",
      duration: "8:45",
      views: "2.5K",
      platform: "youtube"
    },
    {
      id: 3,
      title: "Project Expo 2026 - Best Projects",
      thumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400",
      videoUrl: "https://www.instagram.com/reel/DUgY-IzAZK3/",
      category: "Project Expo",
      duration: "6:20",
      views: "980",
      platform: "instagram"
    },
    {
      id: 4,
      title: "Cyber Security Workshop",
      thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400",
      videoUrl: "https://www.instagram.com/reel/DUVXFtLE_Ym/",
      category: "Technical",
      duration: "10:15",
      views: "1.8K",
      platform: "instagram"
    },
    {
      id: 5,
      title: "Cultural Fest 2026 - Grand Finale",
      thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400",
      videoUrl: "https://www.instagram.com/reel/DS-ZMYYD1-g/",
      category: "Non-Technical",
      duration: "7:50",
      views: "3.1K",
      platform: "instagram"
    },
    {
      id: 6,
      title: "Startup Pitch Competition Winners",
      thumbnail: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400",
      videoUrl: "https://www.instagram.com/reel/DTFbpZsgWu4/",
      category: "Technical",
      duration: "4:30",
      views: "1.5K",
      platform: "instagram"
    }
  ];

  return (
    <div className="video-gallery-container">
      <div className="container">
        <div className="video-header">
          <h1>🎥 Event Video Gallery</h1>
          <p>Watch highlights and memorable moments from our events</p>
        </div>

        {selectedVideo && selectedVideo.platform === "youtube" && (
          <div className="video-player-modal">
            <div className="video-player-card">
              <div className="video-iframe-wrapper">
                <iframe
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.title}
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              </div>
              <div className="video-info-section">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h3 className="fw-bold mb-3">{selectedVideo.title}</h3>
                    <div className="d-flex gap-4 text-muted">
                      <span>👁️ {selectedVideo.views} views</span>
                      <span>⏱️ {selectedVideo.duration}</span>
                      <span className="video-category-badge">{selectedVideo.category}</span>
                    </div>
                  </div>
                  <button 
                    className="btn btn-outline-secondary close-video-btn"
                    onClick={() => setSelectedVideo(null)}
                  >
                    ✕ Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="row">
          {videos.map(video => (
            <div className="col-lg-4 col-md-6 mb-4" key={video.id}>
              <div className="video-card" onClick={() => handleVideoClick(video)}>
                <div className="video-thumbnail-wrapper">
                  <img 
                    src={video.thumbnail} 
                    className="video-thumbnail"
                    alt={video.title}
                  />
                  <div className="video-play-overlay">
                    <div className="video-play-button">
                      <span className="video-play-icon">▶️</span>
                    </div>
                  </div>
                  {video.platform === "instagram" && (
                    <span className="video-platform-badge badge-instagram">
                      📱 Instagram
                    </span>
                  )}
                  {video.platform === "youtube" && (
                    <span className="video-platform-badge badge-youtube">
                      ▶️ YouTube
                    </span>
                  )}
                  <span className="video-duration-badge">
                    {video.duration}
                  </span>
                </div>
                <div className="video-card-body">
                  <h5 className="video-title">{video.title}</h5>
                  <div className="video-meta">
                    <span className="video-category-badge">{video.category}</span>
                    <small className="video-views">👁️ {video.views}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <button 
            className="back-to-events-btn"
            onClick={() => navigate("/events")}
          >
            ← Back to Events
          </button>
        </div>
      </div>
    </div>
  );
}
