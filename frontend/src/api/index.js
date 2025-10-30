const HOTEL_API_BASE =
  import.meta.env.VITE_HOTEL_API_URL || "http://localhost/api";
const EVENT_API_BASE =
  import.meta.env.VITE_EVENT_API_URL || "http://localhost/api";

export async function getHotels() {
  const res = await fetch(`${HOTEL_API_BASE}/hotels`);
  return res.json();
}

export async function createHotel(data) {
  const res = await fetch(`${HOTEL_API_BASE}/hotels`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create hotel");
  return res.json();
}

export async function updateHotel(id, data) {
  const res = await fetch(`${HOTEL_API_BASE}/hotels/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update hotel");
  return res.json();
}

export async function deleteHotel(id) {
  const res = await fetch(`${HOTEL_API_BASE}/hotels/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete hotel");
  return res.json();
}

export async function getEvents() {
  const res = await fetch(`${EVENT_API_BASE}/events`);
  return res.json();
}
