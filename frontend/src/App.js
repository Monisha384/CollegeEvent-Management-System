import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateEvent from "./pages/CreateEvent";
import Events from "./pages/Events";
import EventRegister from "./pages/EventRegister";
import RegisteredMembers from "./pages/RegisteredMembers";
import EventVideos from "./pages/EventVideos";
import EventChat from "./pages/EventChat";
import AskQuery from "./pages/AskQuery";
import MyQueries from "./pages/MyQueries";
import ManageQueries from "./pages/ManageQueries";
import LiveEvent from "./pages/LiveEvent";
import LiveClasses from "./pages/LiveClasses";
import ApiTest from "./pages/ApiTest";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/:id" element={<EventRegister />} />
        <Route path="/members/:id" element={<RegisteredMembers />} />
        <Route path="/chat/:id" element={<EventChat />} />
        <Route path="/ask-query/:id" element={<AskQuery />} />
        <Route path="/my-queries" element={<MyQueries />} />
        <Route path="/manage-queries" element={<ManageQueries />} />
        <Route path="/live/:id" element={<LiveEvent />} />
        <Route path="/live-classes" element={<LiveClasses />} />
        <Route path="/videos" element={<EventVideos />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/events" element={<Events />} />
        <Route path="/api-test" element={<ApiTest />} />
      </Routes>
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
