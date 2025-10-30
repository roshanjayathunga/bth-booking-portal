import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { getHotels, createHotel, updateHotel, deleteHotel } from "@/api";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState("");
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [hotelForm, setHotelForm] = useState({
    name: "",
    location: "",
    rating: "",
    description: "",
  });
  const [editingHotelId, setEditingHotelId] = useState(null);

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

  const openAddDialog = () => {
    setHotelForm({ name: "", location: "", rating: "", description: "" });
    setAddDialogOpen(true);
  };

  const openEditDialog = (hotel) => {
    setHotelForm(hotel);
    setEditingHotelId(hotel.id);
    setEditDialogOpen(true);
  };

  const handleAddHotel = async () => {
    try {
      await createHotel(hotelForm);
      setNotification("Hotel added successfully");
      fetchHotels();
    } catch {
      setError("Failed to add hotel");
    } finally {
      setAddDialogOpen(false);
    }
  };

  const handleEditHotel = async () => {
    try {
      await updateHotel(editingHotelId, hotelForm);
      setNotification("Hotel updated successfully");
      fetchHotels();
    } catch {
      setError("Failed to update hotel");
    } finally {
      setEditDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Hotels</h1>

        {/* Display loading state */}
        {loading && <div className="text-blue-500">Loading hotels...</div>}

        {/* Display error messages */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Display notifications */}
        {notification && (
          <div className="text-green-500 mb-4">{notification}</div>
        )}

        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>Add Hotel</Button>
          </DialogTrigger>
          {isAddDialogOpen && (
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Hotel</DialogTitle>
                <DialogDescription>
                  Fill in the details below to add a new hotel.
                </DialogDescription>
              </DialogHeader>
              <form>
                <Label>Name</Label>
                <Input
                  value={hotelForm.name}
                  onChange={(e) =>
                    setHotelForm({ ...hotelForm, name: e.target.value })
                  }
                />

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleAddHotel}>Submit</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          )}
        </Dialog>

        <div className="grid gap-4 mt-6">
          {hotels.map((hotel) => (
            <Card
              key={hotel.id}
              className="p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">{hotel.name}</h3>
              </div>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => openEditDialog(hotel)}
                    >
                      Edit
                    </Button>
                  </DialogTrigger>
                  {isEditDialogOpen && (
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Hotel</DialogTitle>
                        <DialogDescription>
                          Update the details below.
                        </DialogDescription>
                      </DialogHeader>
                      <form>
                        <Label>Name</Label>
                        <Input
                          value={hotelForm.name}
                          onChange={(e) =>
                            setHotelForm({ ...hotelForm, name: e.target.value })
                          }
                        />

                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button onClick={handleEditHotel}>Submit</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  )}
                </Dialog>
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
