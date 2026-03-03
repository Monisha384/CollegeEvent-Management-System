import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function EventRegister() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    year: "",
    department: "",
    paymentMethod: "upi",
    upiId: "monishamurugesan93@okaxis",
    transactionId: "",
    hostelAccommodation: false
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    api.get(`/events/${id}`)
      .then(res => {
        setEvent(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/registrations", {
        eventId: id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        college: formData.college,
        year: formData.year,
        department: formData.department,
        paymentMethod: formData.paymentMethod,
        transactionId: formData.transactionId,
        participationMode: formData.participationMode,
        hostelAccommodation: formData.hostelAccommodation
      });
      alert("✅ Registration successful! Payment confirmation will be sent to your email.");
      navigate("/events");
    } catch (error) {
      alert("❌ Registration failed. Please try again.");
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

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <h3 className="fw-bold mb-3">🎫 Event Registration</h3>
                <div className="alert alert-info">
                  <strong>Event:</strong> {event.title}
                  <br />
                  <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                  <br />
                  <strong>Venue:</strong> {event.venue}
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white py-3">
                  <h5 className="mb-0 fw-bold">👤 Personal Information</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        className="form-control"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Phone Number *</label>
                      <input
                        type="tel"
                        className="form-control"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">College Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.college}
                        onChange={(e) => setFormData({...formData, college: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Year *</label>
                      <select
                        className="form-select"
                        value={formData.year}
                        onChange={(e) => setFormData({...formData, year: e.target.value})}
                        required
                      >
                        <option value="">Select Year</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Department *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g., Computer Science"
                        value={formData.department}
                        onChange={(e) => setFormData({...formData, department: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white py-3">
                  <h5 className="mb-0 fw-bold">🎯 Participation Mode</h5>
                </div>
                <div className="card-body">
                  <div className="alert alert-info">
                    <strong>💡 Note:</strong> Choose your preferred mode of participation. You can switch to online mode if unable to attend physically.
                  </div>
                  
                  <label className="form-label fw-bold">Select Participation Mode *</label>
                  <div className="mb-3">
                    <div className="form-check mb-3 p-3 border rounded" style={{cursor: "pointer"}}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="participationMode"
                        id="offline"
                        value="Offline"
                        checked={formData.participationMode === "Offline"}
                        onChange={(e) => setFormData({...formData, participationMode: e.target.value})}
                      />
                      <label className="form-check-label w-100" htmlFor="offline" style={{cursor: "pointer"}}>
                        <strong>🏫 On-Campus (Offline)</strong>
                        <p className="text-muted small mb-0 mt-1">Attend the event physically at the venue</p>
                      </label>
                    </div>
                    <div className="form-check p-3 border rounded" style={{cursor: "pointer"}}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="participationMode"
                        id="online"
                        value="Online"
                        checked={formData.participationMode === "Online"}
                        onChange={(e) => setFormData({...formData, participationMode: e.target.value})}
                      />
                      <label className="form-check-label w-100" htmlFor="online" style={{cursor: "pointer"}}>
                        <strong>💻 Online (Virtual)</strong>
                        <p className="text-muted small mb-0 mt-1">Join the event virtually via online platform</p>
                      </label>
                    </div>
                  </div>

                  {formData.participationMode === "Online" && (
                    <div className="alert alert-warning">
                      <strong>⚠️ Important:</strong> Online meeting link will be sent to your email 1 hour before the event.
                    </div>
                  )}
                </div>
              </div>

              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white py-3">
                  <h5 className="mb-0 fw-bold">🏨 Hostel Accommodation</h5>
                </div>
                <div className="card-body">
                  <div className="form-check p-3 border rounded">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="hostelAccommodation"
                      checked={formData.hostelAccommodation}
                      onChange={(e) => setFormData({...formData, hostelAccommodation: e.target.checked})}
                    />
                    <label className="form-check-label" htmlFor="hostelAccommodation">
                      <strong>I need hostel accommodation</strong>
                      <p className="text-muted small mb-0 mt-1">Free accommodation will be provided for outstation participants</p>
                    </label>
                  </div>
                  {formData.hostelAccommodation && (
                    <div className="alert alert-info mt-3">
                      <strong>✓ Accommodation Confirmed</strong>
                      <p className="mb-0 small">Hostel details will be sent to your email after registration</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white py-3">
                  <h5 className="mb-0 fw-bold">💳 Payment Details</h5>
                </div>
                <div className="card-body">
                  <div className="alert alert-success">
                    <strong>Registration Fee:</strong> ₹100
                  </div>

                  <label className="form-label fw-bold">Payment Method *</label>
                  <div className="mb-3">
                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="upi"
                        value="upi"
                        checked={formData.paymentMethod === "upi"}
                        onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                      />
                      <label className="form-check-label" htmlFor="upi">
                        UPI Payment (Google Pay, PhonePe, Paytm)
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="card"
                        value="card"
                        checked={formData.paymentMethod === "card"}
                        onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                      />
                      <label className="form-check-label" htmlFor="card">
                        Credit/Debit Card
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="netbanking"
                        value="netbanking"
                        checked={formData.paymentMethod === "netbanking"}
                        onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                      />
                      <label className="form-check-label" htmlFor="netbanking">
                        Net Banking
                      </label>
                    </div>
                  </div>

                  {formData.paymentMethod === "upi" && (
                    <div className="mt-4">
                      <div className="card border-primary">
                        <div className="card-body text-center">
                          <h6 className="fw-bold mb-3">📱 UPI Payment Details</h6>
                          
                          <div className="mb-3">
                            <div style={{
                              width: "220px",
                              height: "220px",
                              margin: "0 auto",
                              padding: "10px",
                              background: "white",
                              border: "3px solid #0d6efd",
                              borderRadius: "15px"
                            }}>
                              <img 
                                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=monishamurugesan93@okaxis%26pn=CollegeEvents%26am=100%26cu=INR"
                                alt="UPI QR Code"
                                style={{width: "200px", height: "200px", display: "block"}}
                              />
                            </div>
                            <p className="text-muted small mt-2">Scan with any UPI app to pay</p>
                          </div>
                          
                          <div className="alert alert-success mb-3">
                            <div className="mb-2">
                              <strong>UPI ID:</strong>
                            </div>
                            <div style={{fontSize: "18px", fontWeight: "bold", color: "#155724", fontFamily: "monospace"}}>
                              {formData.upiId}
                            </div>
                            <div className="mt-2">
                              <strong>Amount:</strong> <span style={{fontSize: "20px", fontWeight: "bold"}}>₹100</span>
                            </div>
                          </div>
                          
                          <div className="alert alert-info mb-3">
                            <strong>📱 Payment Steps:</strong>
                            <ol className="text-start mb-0 mt-2" style={{fontSize: "13px"}}>
                              <li>Open Google Pay / PhonePe / Paytm</li>
                              <li>Scan QR code OR enter UPI ID</li>
                              <li>Pay ₹100</li>
                              <li>Copy Transaction ID</li>
                              <li>Paste below and submit</li>
                            </ol>
                          </div>
                          
                          <div className="mb-3">
                            <label className="form-label fw-bold">Transaction ID / UTR Number *</label>
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              placeholder="Enter 12-digit transaction ID"
                              value={formData.transactionId}
                              onChange={(e) => setFormData({...formData, transactionId: e.target.value})}
                              required
                            />
                            <small className="text-muted">Example: 123456789012</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === "card" && (
                    <div className="mt-4">
                      <div className="alert alert-warning">
                        <strong>Note:</strong> Card payment gateway will be integrated soon. Please use UPI for now.
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === "netbanking" && (
                    <div className="mt-4">
                      <div className="alert alert-warning">
                        <strong>Note:</strong> Net Banking will be integrated soon. Please use UPI for now.
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                  <h6 className="fw-bold mb-3">📋 Terms & Conditions</h6>
                  <ul className="small text-muted">
                    <li>Registration fee is non-refundable</li>
                    <li>Participants must carry valid college ID</li>
                    <li>Event timings are subject to change</li>
                    <li>Organizers reserve the right to cancel registration</li>
                  </ul>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="terms"
                      required
                    />
                    <label className="form-check-label" htmlFor="terms">
                      I agree to the terms and conditions *
                    </label>
                  </div>
                </div>
              </div>

              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary btn-lg">
                  💳 Proceed to Payment
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => navigate("/events")}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
