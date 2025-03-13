import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Donation from "./pages/Donation";
import Volunteer from "./pages/Volunteer";
import AllVolunteers from "./pages/AllVolunteers";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donate" element={<Donation />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/all-volunteers" element={<AllVolunteers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;