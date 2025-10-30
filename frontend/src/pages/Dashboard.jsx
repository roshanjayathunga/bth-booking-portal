import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Hotels</h2>
            <p className="mb-4">Manage all hotels in the system.</p>
            <Link to="/hotels" className="text-primary font-bold">
              Go to Hotels
            </Link>
          </Card>
          <Card className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Events</h2>
            <p className="mb-4">Manage all events in the system.</p>
            <Link to="/events" className="text-primary font-bold">
              Go to Events
            </Link>
          </Card>
          <Card className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Bookings</h2>
            <p className="mb-4">View and manage bookings.</p>
            <Link to="/bookings" className="text-primary font-bold">
              Go to Bookings
            </Link>
          </Card>
        </div>
        {/* Add summary stats and recent activity here if needed */}
      </div>
    </div>
  );
}

export default Dashboard;
