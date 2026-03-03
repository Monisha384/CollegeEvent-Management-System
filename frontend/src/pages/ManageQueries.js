import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function ManageQueries() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [eventFilter, setEventFilter] = useState("All");
  const [responseText, setResponseText] = useState({});
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const res = await api.get("/queries");
      setQueries(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRespond = async (queryId) => {
    const response = responseText[queryId];
    if (!response?.trim()) {
      alert("Please enter a response");
      return;
    }

    try {
      await api.patch(`/queries/${queryId}/respond`, {
        adminResponse: response,
        respondedBy: user.name || "Admin"
      });
      alert("✅ Response sent successfully!");
      fetchQueries();
      setResponseText({ ...responseText, [queryId]: "" });
    } catch (error) {
      alert("❌ Failed to send response");
      console.error(error);
    }
  };

  const handleDelete = async (queryId) => {
    if (!window.confirm("Are you sure you want to delete this query?")) return;
    
    try {
      await api.delete(`/queries/${queryId}`);
      alert("✅ Query deleted successfully!");
      fetchQueries();
    } catch (error) {
      alert("❌ Failed to delete query");
      console.error(error);
    }
  };

  const events = ["All", ...new Set(queries.map(q => q.eventId?.title).filter(Boolean))];
  
  let filteredQueries = queries;
  if (filter !== "All") {
    filteredQueries = filteredQueries.filter(q => q.status === filter);
  }
  if (eventFilter !== "All") {
    filteredQueries = filteredQueries.filter(q => q.eventId?.title === eventFilter);
  }

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
                <h3 className="fw-bold mb-2">🎯 Manage Queries</h3>
                <p className="text-muted mb-0">Respond to student questions</p>
              </div>
              <button className="btn btn-outline-primary" onClick={() => navigate("/dashboard")}>
                ← Back to Dashboard
              </button>
            </div>
            
            <div className="row g-2">
              <div className="col-md-6">
                <select
                  className="form-select"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="All">All Status ({queries.length})</option>
                  <option value="Pending">Pending ({queries.filter(q => q.status === "Pending").length})</option>
                  <option value="Answered">Answered ({queries.filter(q => q.status === "Answered").length})</option>
                </select>
              </div>
              <div className="col-md-6">
                <select
                  className="form-select"
                  value={eventFilter}
                  onChange={(e) => setEventFilter(e.target.value)}
                >
                  {events.map(evt => (
                    <option key={evt} value={evt}>{evt}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {filteredQueries.length === 0 ? (
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center py-5">
              <div className="fs-1 mb-3">📭</div>
              <h5>No queries found</h5>
              <p className="text-muted">No questions match your filters</p>
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
                        <h5 className="fw-bold mb-1">{query.eventId?.title}</h5>
                        <small className="text-muted">
                          Asked by <strong>{query.studentName}</strong> ({query.studentEmail})
                          <br />
                          {new Date(query.createdAt).toLocaleString()}
                        </small>
                      </div>
                      <div className="d-flex gap-2">
                        <span className={`badge ${query.status === "Answered" ? "bg-success" : "bg-warning"}`}>
                          {query.status}
                        </span>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(query._id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>

                    <div className="mb-3">
                      <strong className="text-primary">Question:</strong>
                      <p className="mt-2 mb-0 p-3 bg-light rounded">{query.question}</p>
                    </div>

                    {query.status === "Answered" ? (
                      <div className="alert alert-success mb-0">
                        <strong className="text-success">✅ Your Response:</strong>
                        <p className="mt-2 mb-2">{query.adminResponse}</p>
                        <small className="text-muted">
                          Responded by {query.respondedBy} on {new Date(query.respondedAt).toLocaleString()}
                        </small>
                      </div>
                    ) : (
                      <div>
                        <label className="form-label fw-bold">Write Response:</label>
                        <textarea
                          className="form-control mb-2"
                          rows="3"
                          placeholder="Type your response here..."
                          value={responseText[query._id] || ""}
                          onChange={(e) => setResponseText({ ...responseText, [query._id]: e.target.value })}
                        />
                        <button
                          className="btn btn-success"
                          onClick={() => handleRespond(query._id)}
                        >
                          📤 Send Response
                        </button>
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
