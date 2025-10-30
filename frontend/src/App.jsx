import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import Events from "./pages/Events";
import Bookings from "./pages/Bookings";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/events" element={<Events />} />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>
    </Router>
  );
}

export default App;
