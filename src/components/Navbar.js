import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-primary text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Mata3im Rahma</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-secondary">Home</Link>
          <Link to="/donate" className="hover:text-secondary">Donate</Link>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;