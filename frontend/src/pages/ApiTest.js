import { useState, useEffect } from "react";
import api from "../api";

export default function ApiTest() {
  const [status, setStatus] = useState("Testing...");
  const [apiUrl, setApiUrl] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    setApiUrl(api.defaults.baseURL);
    
    try {
      // Test health endpoint
      const healthRes = await api.get("/health");
      setStatus("✅ Backend Connected: " + healthRes.data.message);
      
      // Test events endpoint
      const eventsRes = await api.get("/events");
      setEvents(eventsRes.data);
    } catch (error) {
      setStatus("❌ Connection Failed: " + error.message);
      console.error("Connection test failed:", error);
    }
  };

  return (
    <div className="container py-5">
      <div className="card">
        <div className="card-body">
          <h3>🔧 API Connection Test</h3>
          <hr />
          <p><strong>API URL:</strong> {apiUrl}</p>
          <p><strong>Status:</strong> {status}</p>
          <p><strong>Events Found:</strong> {events.length}</p>
          
          {events.length > 0 && (
            <div className="mt-3">
              <h5>Sample Events:</h5>
              <ul>
                {events.slice(0, 3).map(evt => (
                  <li key={evt._id}>{evt.title}</li>
                ))}
              </ul>
            </div>
          )}
          
          <button className="btn btn-primary mt-3" onClick={testConnection}>
            🔄 Test Again
          </button>
        </div>
      </div>
    </div>
  );
}
