import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { generateCertificate } from "../utils/certificateGenerator";

export default function RegisteredMembers() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventRes = await api.get(`/events/${id}`);
        setEvent(eventRes.data);
        
        const regRes = await api.get(`/registrations/event/${id}`);
        setRegistrations(regRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleDelete = async (regId) => {
    if (window.confirm("Are you sure you want to delete this registration?")) {
      try {
        await api.delete(`/registrations/${regId}`);
        setRegistrations(registrations.filter(reg => reg._id !== regId));
        alert("✅ Registration deleted successfully!");
      } catch (error) {
        alert("❌ Failed to delete registration");
        console.error(error);
      }
    }
  };

  const handleAttendance = async (regId, status) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      await api.patch(`/registrations/${regId}/attendance`, {
        attendanceStatus: status,
        markedBy: user.name || "Admin"
      });
      setRegistrations(registrations.map(reg => 
        reg._id === regId ? { ...reg, attendanceStatus: status } : reg
      ));
      alert(`✅ Attendance marked as ${status}!`);
    } catch (error) {
      alert("❌ Failed to mark attendance");
      console.error(error);
    }
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

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h3 className="fw-bold mb-2">👥 Registered Members</h3>
                <p className="text-muted mb-0">{event?.title}</p>
              </div>
              <button className="btn btn-outline-primary" onClick={() => navigate("/events")}>
                ← Back to Events
              </button>
            </div>
            <div className="alert alert-info">
              <strong>Total Registrations:</strong> {registrations.length}
            </div>
          </div>
        </div>

        {registrations.length === 0 ? (
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center py-5">
              <div className="fs-1 mb-3">📋</div>
              <h5>No registrations yet</h5>
              <p className="text-muted">Be the first to register for this event!</p>
            </div>
          </div>
        ) : (
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Mode</th>
                      <th>Hostel</th>
                      <th>Payment</th>
                      <th>Attendance</th>
                      <th>Certificate</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((reg, index) => (
                      <tr key={reg._id}>
                        <td>{index + 1}</td>
                        <td className="fw-bold">{reg.name}</td>
                        <td>{reg.email}</td>
                        <td>{reg.phone}</td>
                        <td>
                          <span className={`badge ${reg.participationMode === "Online" ? "bg-info" : "bg-success"}`}>
                            {reg.participationMode === "Online" ? "💻 Online" : "🏫 Offline"}
                          </span>
                        </td>
                        <td>
                          {reg.hostelAccommodation ? (
                            <span className="badge bg-primary">🏨 Yes</span>
                          ) : (
                            <span className="badge bg-secondary">No</span>
                          )}
                        </td>
                        <td>
                          <span className="badge bg-success">{reg.paymentMethod?.toUpperCase()}</span>
                        </td>
                        <td>
                          <select 
                            className={`form-select form-select-sm ${reg.attendanceStatus === "Attended" ? "bg-success text-white" : reg.attendanceStatus === "Absent" ? "bg-danger text-white" : "bg-warning"}`}
                            value={reg.attendanceStatus || "Registered"}
                            onChange={(e) => handleAttendance(reg._id, e.target.value)}
                            style={{minWidth: "120px"}}
                          >
                            <option value="Registered">Registered</option>
                            <option value="Attended">Attended</option>
                            <option value="Absent">Absent</option>
                          </select>
                        </td>
                        <td>
                          {reg.attendanceStatus === "Attended" ? (
                            <button 
                              className="btn btn-success btn-sm"
                              onClick={() => generateCertificate(reg.name, event?.title, event?.date)}
                            >
                              📜 Download
                            </button>
                          ) : (
                            <button 
                              className="btn btn-secondary btn-sm"
                              disabled
                              title="Certificate available only after attendance"
                            >
                              🔒 Locked
                            </button>
                          )}
                        </td>
                        <td>
                          <button 
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(reg._id)}
                          >
                            🗑️ Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
