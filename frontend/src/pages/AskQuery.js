import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function AskQuery() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!user.email) {
      alert("Please login to ask questions");
      navigate("/login");
      return;
    }
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const res = await api.get(`/events/${id}`);
      setEvent(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/queries", {
        eventId: id,
        studentName: user.name,
        studentEmail: user.email,
        question
      });
      alert("✅ Question submitted successfully!");
      navigate("/my-queries");
    } catch (error) {
      alert("❌ Failed to submit question");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <h3 className="fw-bold mb-3">❓ Ask a Question</h3>
                <div className="alert alert-info">
                  <strong>Event:</strong> {event?.title}
                  <br />
                  <strong>Coordinator:</strong> {event?.coordinator}
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Your Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={user.name}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Your Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={user.email}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Your Question *</label>
                    <textarea
                      className="form-control"
                      rows="5"
                      placeholder="Type your question or doubt here..."
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      required
                    />
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                      {loading ? "Submitting..." : "📤 Submit Question"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => navigate("/events")}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
