import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { getEvents } from "@/api";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getEvents()
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch events");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col items-center justify-center py-16">
        <h1 className="text-4xl font-bold mb-4">Events</h1>
        <p className="text-lg text-gray-700 mb-8">
          Explore our range of events.
        </p>
        {loading && <p>Loading events...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <ul className="w-full max-w-xl">
          {events.map((event) => (
            <li key={event.id} className="bg-white shadow rounded p-4 mb-4">
              <h2 className="text-2xl font-semibold mb-2">{event.name}</h2>
              <p className="text-gray-600 mb-1">Venue: {event.venue}</p>
              <p className="text-gray-600 mb-1">Date: {event.date}</p>
              <p className="text-gray-700">{event.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Events;
