import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { getHotels, createHotel, updateHotel, deleteHotel } from "@/api";

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newHotelName, setNewHotelName] = useState("");
  const [notification, setNotification] = useState("");

  const fetchHotels = () => {
    setLoading(true);
    getHotels()
      .then((data) => {
        setHotels(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch hotels");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Hotels</h1>
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-6">
          <input
            type="text"
            value={newHotelName}
            onChange={(e) => setNewHotelName(e.target.value)}
            placeholder="New hotel name"
            className="border px-2 py-1 mr-2"
          />
          <Button
            onClick={async () => {
              if (!newHotelName.trim()) return;
              try {
                await createHotel({ name: newHotelName });
                setNotification("Hotel added successfully");
                setNewHotelName("");
                fetchHotels();
              } catch {
                setError("Failed to add hotel");
              }
            }}
          >
            Add Hotel
          </Button>
        </div>
        {notification && (
          <div className="text-green-600 mb-2">{notification}</div>
        )}
        <div className="grid gap-4">
          {hotels.map((hotel) => (
            <Card
              key={hotel.id}
              className="p-4 flex justify-between items-center"
            >
              <span>{hotel.name}</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={async () => {
                    const newName = prompt("Edit hotel name", hotel.name);
                    if (newName && newName !== hotel.name) {
                      try {
                        await updateHotel(hotel.id, { name: newName });
                        setNotification("Hotel updated successfully");
                        fetchHotels();
                      } catch {
                        setError("Failed to update hotel");
                      }
                    }
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={async () => {
                    if (window.confirm("Delete this hotel?")) {
                      try {
                        await deleteHotel(hotel.id);
                        setNotification("Hotel deleted successfully");
                        fetchHotels();
                      } catch {
                        setError("Failed to delete hotel");
                      }
                    }
                  }}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hotels;
