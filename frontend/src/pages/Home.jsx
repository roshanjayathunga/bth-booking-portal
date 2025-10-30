import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col items-center justify-center py-16">
        <Card className="max-w-md w-full p-8 text-center shadow-lg">
          <h1 className="text-3xl font-bold mb-4 text-primary">
            Welcome to the Booking Portal
          </h1>
          <p className="mb-6 text-gray-600">
            Book hotels, events, and manage your reservations easily.
          </p>
          <div className="flex flex-col gap-4">
            <Link to="/hotels">
              <Button className="w-full">Browse Hotels</Button>
            </Link>
            <Link to="/events">
              <Button className="w-full" variant="outline">
                Browse Events
              </Button>
            </Link>
            <Link to="/bookings">
              <Button className="w-full" variant="secondary">
                My Bookings
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Home;
