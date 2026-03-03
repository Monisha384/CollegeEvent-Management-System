import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function CreateEvent() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    image: "",
    category: "",
    coordinator: "",
    email: "",
    featured: false,
    liveStreamUrl: "",
    isLive: false
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await api.post("/events", form);
      alert("✅ Event created successfully!");
      navigate("/dashboard");
    } catch (err) {
      alert("❌ Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white py-4">
                <h3 className="mb-0 fw-bold">✨ Create New Event</h3>
                <p className="text-muted mb-0">Fill in the details to create an amazing event</p>
              </div>
              
              <div className="card-body p-4">
                <form onSubmit={submit}>
                  <div className="row">
                    <div className="col-md-8 mb-3">
                      <label className="form-label fw-bold">Event Title *</label>
                      <input 
                        className="form-control form-control-lg" 
                        placeholder="e.g., AI & Machine Learning Summit 2024"
                        value={form.title}
                        onChange={e => setForm({...form, title:e.target.value})} 
                        required
                      />
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-bold">Category *</label>
                      <select 
                        className="form-select form-select-lg"
                        value={form.category}
                        onChange={e => setForm({...form, category:e.target.value})}
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="Technical">Technical</option>
                        <option value="Non-Technical">Non-Technical</option>
                        <option value="Hackathon">Hackathon</option>
                        <option value="Paper Presentation">Paper Presentation</option>
                        <option value="Project Expo">Project Expo</option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Event Date *</label>
                      <input 
                        type="date" 
                        className="form-control form-control-lg"
                        value={form.date}
                        onChange={e => setForm({...form, date:e.target.value})} 
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Venue *</label>
                      <input 
                        className="form-control form-control-lg" 
                        placeholder="e.g., Main Auditorium, Block A"
                        value={form.venue}
                        onChange={e => setForm({...form, venue:e.target.value})} 
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Event Image URL *</label>
                    <input 
                      className="form-control form-control-lg" 
                      placeholder="https://example.com/image.jpg"
                      value={form.image}
                      onChange={e => setForm({...form, image:e.target.value})} 
                      required
                    />
                    <small className="text-muted">Tip: Use Unsplash or similar for high-quality images</small>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Coordinator Name</label>
                      <select 
                        className="form-select form-select-lg"
                        value={form.coordinator}
                        onChange={e => setForm({...form, coordinator:e.target.value})}
                      >
                        <option value="">Select Coordinator</option>
                        <option value="Moni">Moni</option>
                        <option value="Monika">Monika</option>
                        <option value="Nandhini">Nandhini</option>
                        <option value="Mouli">Mouli</option>
                        <option value="Nathiya">Nathiya</option>
                        <option value="Harini">Harini</option>
                        <option value="Shivani">Shivani</option>
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Coordinator Email</label>
                      <input 
                        type="email"
                        className="form-control form-control-lg" 
                        placeholder="coordinator@college.edu"
                        value={form.email}
                        onChange={e => setForm({...form, email:e.target.value})} 
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Description *</label>
                    <textarea 
                      className="form-control" 
                      rows="4"
                      placeholder="Describe your event in detail..."
                      value={form.description}
                      onChange={e => setForm({...form, description:e.target.value})} 
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Live Stream URL (Optional)</label>
                    <input 
                      className="form-control form-control-lg" 
                      placeholder="YouTube Live URL or Google Meet link"
                      value={form.liveStreamUrl}
                      onChange={e => setForm({...form, liveStreamUrl:e.target.value})} 
                    />
                    <small className="text-muted">For hybrid/online events. Supports YouTube and Google Meet</small>
                  </div>

                  <div className="form-check form-switch mb-3">
                    <input 
                      type="checkbox"
                      className="form-check-input"
                      id="isLive"
                      checked={form.isLive}
                      onChange={e => setForm({...form, isLive:e.target.checked})} 
                    />
                    <label className="form-check-label fw-bold" htmlFor="isLive">
                      🔴 Event is Live Now
                    </label>
                  </div>

                  <div className="form-check form-switch mb-4">
                    <input 
                      type="checkbox"
                      className="form-check-input"
                      id="featured"
                      checked={form.featured}
                      onChange={e => setForm({...form, featured:e.target.checked})} 
                    />
                    <label className="form-check-label fw-bold" htmlFor="featured">
                      ⭐ Mark as Featured Event
                    </label>
                  </div>

                  <div className="d-grid gap-2">
                    <button 
                      className="btn btn-primary btn-lg" 
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Creating Event..." : "✨ Create Event"}
                    </button>
                    <button 
                      className="btn btn-outline-secondary" 
                      type="button"
                      onClick={() => navigate("/dashboard")}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
