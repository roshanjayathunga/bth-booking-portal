import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { getEvents, createEvent, updateEvent, deleteEvent } from "@/api";
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
import { Button } from "@/components/ui/button";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState("");
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [eventForm, setEventForm] = useState({
    name: "",
    venue: "",
    date: "",
    description: "",
  });
  const [editingEventId, setEditingEventId] = useState(null);

  const fetchEvents = () => {
    setLoading(true);
    getEvents()
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch events");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const openAddDialog = () => {
    setEventForm({ name: "", venue: "", date: "", description: "" });
    setAddDialogOpen(true);
  };

  const openEditDialog = (event) => {
    setEventForm(event);
    setEditingEventId(event.id);
    setEditDialogOpen(true);
  };

  const handleAddEvent = async () => {
    try {
      await createEvent(eventForm);
      setNotification("Event added successfully");
      fetchEvents();
    } catch {
      setError("Failed to add event");
    } finally {
      setAddDialogOpen(false);
    }
  };

  const handleEditEvent = async () => {
    try {
      await updateEvent(editingEventId, eventForm);
      setNotification("Event updated successfully");
      fetchEvents();
    } catch {
      setError("Failed to update event");
    } finally {
      setEditDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Events</h1>

        {/* Display loading state */}
        {loading && <div className="text-blue-500">Loading events...</div>}

        {/* Display error messages */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Display notifications */}
        {notification && (
          <div className="text-green-500 mb-4">{notification}</div>
        )}

        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>Add Event</Button>
          </DialogTrigger>
          {isAddDialogOpen && (
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Event</DialogTitle>
                <DialogDescription>
                  Fill in the details below to add a new event.
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={eventForm.name}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, name: e.target.value })
                  }
                />
                <Label>Venue</Label>
                <Input
                  value={eventForm.venue}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, venue: e.target.value })
                  }
                />
                <Label>Date</Label>
                <Input
                  type="date"
                  value={eventForm.date}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, date: e.target.value })
                  }
                />
                <Label>Description</Label>
                <Input
                  value={eventForm.description}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, description: e.target.value })
                  }
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleAddEvent}>Submit</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          )}
        </Dialog>

        <div className="grid gap-4 mt-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white shadow rounded p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">{event.name}</h3>
                <p>{event.venue}</p>
                <p>{event.date}</p>
                <p>{event.description}</p>
              </div>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => openEditDialog(event)}
                    >
                      Edit
                    </Button>
                  </DialogTrigger>
                  {isEditDialogOpen && (
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Event</DialogTitle>
                        <DialogDescription>
                          Update the details below.
                        </DialogDescription>
                      </DialogHeader>
                      <form>
                        <Label>Name</Label>
                        <Input
                          value={eventForm.name}
                          onChange={(e) =>
                            setEventForm({ ...eventForm, name: e.target.value })
                          }
                        />

                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button onClick={handleEditEvent}>Submit</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  )}
                </Dialog>
                <Button
                  variant="destructive"
                  onClick={async () => {
                    if (window.confirm("Delete this event?")) {
                      try {
                        await deleteEvent(event.id);
                        setNotification("Event deleted successfully");
                        fetchEvents();
                      } catch {
                        setError("Failed to delete event");
                      }
                    }
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
