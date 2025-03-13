import React from 'react';
import { Link } from 'react-router-dom'; 

export default function Footer(){
    return (
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
    )
}