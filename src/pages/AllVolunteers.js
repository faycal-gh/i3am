import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AllVolunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/volunteers");
        if (!response.ok) throw new Error("Failed to fetch volunteers");
        const data = await response.json();
        setVolunteers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVolunteers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-8 text-center animate-fade-in">All Volunteers</h1>

          {loading && <p className="text-center text-lg text-gray-700">Loading volunteers...</p>}
          {error && <p className="text-center text-lg text-red-600">Error: {error}</p>}
          {!loading && !error && volunteers.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full bg-gray-50 shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-left">Skills</th>
                    <th className="py-3 px-4 text-left">Availability</th>
                    <th className="py-3 px-4 text-left">Assigned Shifts</th>
                  </tr>
                </thead>
                <tbody>
                  {volunteers.map((volunteer) => (
                    <tr
                      key={volunteer._id} className="border-b hover:bg-gray-100 transition duration-200">
                      <td className="py-4 px-4 text-gray-700">{volunteer.name}</td>
                      <td className="py-4 px-4 text-gray-700">{volunteer.email}</td>
                      <td className="py-4 px-4 text-gray-700">{volunteer.skills || "N/A"}</td>
                      <td className="py-4 px-4 text-gray-700">{volunteer.availability}</td>
                      <td className="py-4 px-4 text-gray-700">
                        {volunteer.shifts.length > 0
                          ? volunteer.shifts.map((shift, index) => (
                            <div key={index}>
                              {shift.task} - {shift.date} ({shift.time})
                            </div>
                          ))
                          : "None"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {!loading && !error && volunteers.length === 0 && (
            <p className="text-center text-lg text-gray-700">No volunteers registered yet</p>
          )}
          <div className="text-center mt-8">
            <Link
              to="/volunteer" className="bg-secondary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition duration-300 shadow-md">
              Back to Volunteer Sign-Up
            </Link>
          </div>
        </div>
      </section>
      <Footer />
      
      {/* CSS Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 1s ease-out;
          }
        `}
      </style>
    </div>
  );
}

export default AllVolunteers;