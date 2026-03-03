import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function MyQueries() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!user.email) {
      alert("Please login to view your queries");
      navigate("/login");
      return;
    }
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const res = await api.get(`/queries/student/${user.email}`);
      setQueries(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredQueries = filter === "All" 
    ? queries 
    : queries.filter(q => q.status === filter);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h3 className="fw-bold mb-2">📋 My Questions</h3>
                <p className="text-muted mb-0">Track your queries and responses</p>
              </div>
              <button className="btn btn-primary" onClick={() => navigate("/events")}>
                ← Back to Events
              </button>
            </div>
            <div className="d-flex gap-2">
              <button
                className={`btn ${filter === "All" ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setFilter("All")}
              >
                All ({queries.length})
              </button>
              <button
                className={`btn ${filter === "Pending" ? "btn-warning" : "btn-outline-warning"}`}
                onClick={() => setFilter("Pending")}
              >
                Pending ({queries.filter(q => q.status === "Pending").length})
              </button>
              <button
                className={`btn ${filter === "Answered" ? "btn-success" : "btn-outline-success"}`}
                onClick={() => setFilter("Answered")}
              >
                Answered ({queries.filter(q => q.status === "Answered").length})
              </button>
            </div>
          </div>
        </div>

        {filteredQueries.length === 0 ? (
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center py-5">
              <div className="fs-1 mb-3">❓</div>
              <h5>No questions found</h5>
              <p className="text-muted">Ask questions about events to get started!</p>
            </div>
          </div>
        ) : (
          <div className="row">
            {filteredQueries.map((query) => (
              <div className="col-12 mb-4" key={query._id}>
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h5 className="fw-bold mb-2">{query.eventId?.title}</h5>
                        <small className="text-muted">
                          Asked on {new Date(query.createdAt).toLocaleString()}
                        </small>
                      </div>
                      <span className={`badge ${query.status === "Answered" ? "bg-success" : "bg-warning"}`}>
                        {query.status}
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <strong className="text-primary">Your Question:</strong>
                      <p className="mt-2 mb-0">{query.question}</p>
                    </div>

                    {query.status === "Answered" && (
                      <div className="alert alert-success mb-0">
                        <strong className="text-success">✅ Admin Response:</strong>
                        <p className="mt-2 mb-2">{query.adminResponse}</p>
                        <small className="text-muted">
                          Responded by {query.respondedBy} on {new Date(query.respondedAt).toLocaleString()}
                        </small>
                      </div>
                    )}

                    {query.status === "Pending" && (
                      <div className="alert alert-warning mb-0">
                        <strong>⏳ Waiting for response...</strong>
                        <p className="mb-0 small">The coordinator will respond soon</p>
                      </div>
                    )}
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
