import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      padding: "50px 0 20px"
    }}>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">🎓 Campus Events</h5>
            <p>Your one-stop platform for discovering and registering for amazing campus events.</p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-white"><i className="bi bi-facebook fs-4"></i></a>
              <a href="#" className="text-white"><i className="bi bi-twitter fs-4"></i></a>
              <a href="#" className="text-white"><i className="bi bi-instagram fs-4"></i></a>
              <a href="#" className="text-white"><i className="bi bi-linkedin fs-4"></i></a>
            </div>
          </div>
          
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/events" className="text-white text-decoration-none">📅 Events</Link></li>
              <li className="mb-2"><Link to="/videos" className="text-white text-decoration-none">🎥 Videos</Link></li>
              <li className="mb-2"><Link to="/dashboard" className="text-white text-decoration-none">📊 Dashboard</Link></li>
              <li className="mb-2"><Link to="/login" className="text-white text-decoration-none">🔐 Login</Link></li>
            </ul>
          </div>
          
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Contact Us</h5>
            <p className="mb-2">📧 events@college.edu</p>
            <p className="mb-2">📞 +91 9345528492</p>
            <p className="mb-2">📍 College Campus, City, State</p>
          </div>
        </div>
        
        <hr style={{borderColor: "rgba(255,255,255,0.2)", margin: "30px 0 20px"}} />
        
        <div className="text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} Campus Events. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
