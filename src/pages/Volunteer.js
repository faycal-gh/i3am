import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Volunteer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
    availability: "",
  });
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [shifts, setShifts] = useState([]);
  const [availableShifts, setAvailableShifts] = useState([]);
  
  useEffect(() => {
    const fetchShifts = async () => {
      const response = await fetch("http://localhost:5000/api/shifts");
      const data = await response.json();
      setAvailableShifts(data);
    };
    fetchShifts();
  }, []);

  // Fetch user's shifts after signup
  useEffect(() => {
    if (isSignedUp) {
      const fetchUserShifts = async () => {
        const response = await fetch(`http://localhost:5000/api/volunteers`);
        const volunteers = await response.json();
        const volunteer = volunteers.find((v) => v.email === formData.email);
        if (volunteer) {
          setShifts(volunteer.shifts || []);
        }
      };
      fetchUserShifts();
    }
  }, [isSignedUp, formData.email]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.availability) {
      try {
        const response = await fetch("http://localhost:5000/api/volunteers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        if (response.ok) {
          setIsSignedUp(true);
          alert("Thank you for signing up as a volunteer!");
        } else {
          alert("Error signing up: " + result.message);
        }
      } catch (error) {
        alert("Error signing up: " + error.message);
      }
    } else {
      alert("Please fill out all required fields.");
    }
  };

  const signUpForShift = async (shift) => {
    if (shift.spots > 0) {
      try {
        const response = await fetch(`http://localhost:5000/api/volunteers/${formData.email}/shifts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ shiftId: shift._id }),
        });
        const result = await response.json();
        if (response.ok) {
          setShifts([...shifts, { date: shift.date, time: shift.time, task: shift.task }]);
          setAvailableShifts(availableShifts.map((s) =>
            s._id === shift._id ? { ...s, spots: s.spots - 1 } : s
          ));
          alert(`You’ve signed up for ${shift.task} on ${shift.date}!`);
        } else {
          alert("Error signing up for shift: " + result.message);
        }
      } catch (error) {
        alert("Error signing up for shift: " + error.message);
      }
    } else {
      alert("Sorry, this shift is full!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <section className="bg-gradient-to-r from-primary to-red-900 text-white py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 animate-fade-in">
            Join Us as a Volunteer
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in-delay">
            Make a difference by helping us provide free iftar meals during Ramadan.
          </p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {!isSignedUp ? (
            // Volunteer Sign-Up Form
            <div className="max-w-lg mx-auto bg-gray-50 p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold text-primary mb-6 text-center">
                Volunteer Sign-Up
              </h2>
              <form onSubmit={handleSignUp}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="name">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="email">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="skills">
                    Skills (e.g., cooking, driving)
                  </label>
                  <input
                    type="text"
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="List your skills"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2" htmlFor="availability">
                    Availability *
                  </label>
                  <textarea
                    id="availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Available weekdays after 3 PM"
                    rows="3"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-secondary text-primary py-3 rounded-lg font-semibold hover:bg-yellow-400 transition duration-300 shadow-md"
                >
                  Sign Up as a Volunteer
                </button>
              </form>
            </div>
          ) : (

            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-primary mb-8 text-center">
                Welcome, {formData.name}!
              </h2>

              {/* Available Shifts */}
              <h3 className="text-2xl font-semibold text-primary mb-6">Available Shifts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableShifts.map((shift) => (
                  <div
                    key={shift._id}
                    className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <h4 className="text-lg font-bold text-primary">{shift.task}</h4>
                    <p className="text-gray-700 mt-2">Date: {shift.date}</p>
                    <p className="text-gray-700">Time: {shift.time}</p>
                    <p className="text-gray-700">Spots Available: {shift.spots}</p>
                    <button
                      onClick={() => signUpForShift(shift)}
                      className="mt-4 w-full bg-secondary text-primary py-2 rounded-lg font-semibold hover:bg-yellow-400 transition duration-300"
                      disabled={shift.spots === 0}
                    >
                      {shift.spots > 0 ? "Sign Up for Shift" : "Shift Full"}
                    </button>
                  </div>
                ))}
              </div>

              {/* Your Shifts */}
              {shifts.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl font-semibold text-primary mb-6">Your Shifts</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {shifts.map((shift, index) => (
                      <div
                        key={index}
                        className="bg-gray-100 p-6 rounded-lg shadow-md"
                      >
                        <h4 className="text-lg font-bold text-primary">{shift.task}</h4>
                        <p className="text-gray-700 mt-2">Date: {shift.date}</p>
                        <p className="text-gray-700">Time: {shift.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>      
      <footer className="bg-primary text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">© 2025 Mata3im Rahma. All rights reserved.</p>
          <div className="space-x-4">
            <Link to="/contact" className="hover:text-secondary">Contact Us</Link>
            <Link to="/privacy" className="hover:text-secondary">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-secondary">Terms of Use</Link>
          </div>
        </div>
      </footer>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInDelay {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 1s ease-out;
          }
          .animate-fade-in-delay {
            animation: fadeInDelay 1s ease-out 0.5s backwards;
          }
        `}
      </style>
    </div>
  );
}

export default Volunteer;