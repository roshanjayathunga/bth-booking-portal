import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow mb-8">
      <Link className="text-xl font-bold text-primary" to="/">
        Booking Portal
      </Link>
      <div className="space-x-4">
        <Link to="/dashboard">
          <Button variant="ghost">Dashboard</Button>
        </Link>
        <Link to="/hotels">
          <Button variant="ghost">Hotels</Button>
        </Link>
        <Link to="/events">
          <Button variant="ghost">Events</Button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
