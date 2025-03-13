import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer"
import '../index.css';
function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">      
      <Navbar />
      <section className="relative bg-gradient-to-r from-primary to-red-900 text-white py-24">
        <div className="container mx-auto text-center px-4">          
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 animate-fade-in">
            Mata3im Rahma
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in-delay">
            Empowering Communities with Free Iftar Meals During Ramadan
          </p>          
          <div className="space-x-4">
            <Link
              to="/donate"
              className="bg-secondary text-primary px-6 py-3 rounded-lg font-semibold text-lg hover:bg-yellow-400 transition duration-300 shadow-md">
              Donate Now
            </Link>
            <Link
              to="/volunteer"
              className="bg-white text-primary px-6 py-3 rounded-lg font-semibold text-lg hover:bg-gray-200 transition duration-300 shadow-md">
              Become a Volunteer
            </Link>
          </div>          
          <div className="absolute top-1/2 left-0 w-1/2 h-1/2 bg-secondary opacity-20 blur-3xl -z-10 transform -translate-y-1/2"></div>
        </div>
      </section>      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
            Our Impact
          </h2>
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">            
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <p className="text-4xl font-bold text-secondary"></p>
              <p className="text-lg text-gray-700 mt-2">Meals Served</p>
            </div>            
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <p className="text-4xl font-bold text-secondary">250+</p>
              <p className="text-lg text-gray-700 mt-2">Volunteers Engaged</p>
            </div>            
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <p className="text-4xl font-bold text-secondary">$6,000+</p>
              <p className="text-lg text-gray-700 mt-2">Funds Raised</p>
            </div>
          </div>
        </div>
      </section>
      <Footer/>

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

export default Home;