import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

export default function EventChat() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [event, setEvent] = useState(null);
  const messagesEndRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchEvent();
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchEvent = async () => {
    try {
      const res = await api.get(`/events/${id}`);
      setEvent(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await api.get(`/chats/event/${id}`);
      setMessages(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await api.post("/chats", {
        eventId: id,
        userName: user.name || "Anonymous",
        userEmail: user.email || "guest@example.com",
        message: newMessage,
        isCoordinator: false
      });
      setNewMessage("");
      fetchMessages();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm mb-3">
              <div className="card-body">
                <h4 className="fw-bold mb-2">💬 Event Chat Room</h4>
                <p className="text-muted mb-0">{event?.title}</p>
              </div>
            </div>

            <div className="card border-0 shadow-sm" style={{ height: "500px", display: "flex", flexDirection: "column" }}>
              <div className="card-body" style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
                {messages.length === 0 ? (
                  <div className="text-center text-muted py-5">
                    <div className="fs-1 mb-3">💬</div>
                    <p>No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div key={msg._id} className="mb-3">
                      <div className={`d-flex ${msg.userEmail === user.email ? "justify-content-end" : ""}`}>
                        <div style={{ maxWidth: "70%" }}>
                          <div className="d-flex align-items-center mb-1">
                            <strong className="small">{msg.userName}</strong>
                            {msg.isCoordinator && (
                              <span className="badge bg-primary ms-2" style={{ fontSize: "10px" }}>Coordinator</span>
                            )}
                          </div>
                          <div
                            className={`p-3 rounded ${msg.userEmail === user.email ? "bg-primary text-white" : "bg-white border"}`}
                            style={{ wordWrap: "break-word" }}
                          >
                            {msg.message}
                          </div>
                          <small className="text-muted">
                            {new Date(msg.createdAt).toLocaleString()}
                          </small>
                        </div>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="card-footer bg-white border-top p-3">
                <form onSubmit={handleSend}>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      required
                    />
                    <button type="submit" className="btn btn-primary">
                      📤 Send
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
