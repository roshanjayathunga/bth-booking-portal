const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

const cors = require("cors");
app.use(cors());

app.use(express.json());

const pool = require("./db");

// GET /hotels
app.get("/hotels", (req, res) => {
  pool.query("SELECT * FROM hotels", (err, result) => {
    if (err) {
      console.error("Error fetching hotels:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result.rows);
  });
});

// GET /hotels/:id
app.get("/hotels/:id", (req, res) => {
  const hotelId = parseInt(req.params.id);
  pool.query("SELECT * FROM hotels WHERE id = $1", [hotelId], (err, result) => {
    if (err) {
      console.error("Error fetching hotel:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Hotel not found" });
    res.json(result.rows[0]);
  });
});

// POST /hotels
app.post("/hotels", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Hotel name is required" });
  pool.query(
    "INSERT INTO hotels (name) VALUES ($1) RETURNING *",
    [name],
    (err, result) => {
      if (err) {
        console.error("Error creating hotel:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.status(201).json(result.rows[0]);
    }
  );
});

// PUT /hotels/:id
app.put("/hotels/:id", (req, res) => {
  const hotelId = parseInt(req.params.id);
  const { name } = req.body;
  pool.query(
    "UPDATE hotels SET name = $1 WHERE id = $2 RETURNING *",
    [name, hotelId],
    (err, result) => {
      if (err) {
        console.error("Error updating hotel:", err);
        return res.status(500).json({ error: "Database error" });
      }
      if (result.rows.length === 0)
        return res.status(404).json({ error: "Hotel not found" });
      res.json(result.rows[0]);
    }
  );
});

// DELETE /hotels/:id
app.delete("/hotels/:id", (req, res) => {
  const hotelId = parseInt(req.params.id);
  pool.query(
    "DELETE FROM hotels WHERE id = $1 RETURNING *",
    [hotelId],
    (err, result) => {
      if (err) {
        console.error("Error deleting hotel:", err);
        return res.status(500).json({ error: "Database error" });
      }
      if (result.rows.length === 0)
        return res.status(404).json({ error: "Hotel not found" });
      res.status(204).send();
    }
  );
});

// GET /hotels/:id/rooms
app.get("/hotels/:id/rooms", (req, res) => {
  const hotelId = parseInt(req.params.id);
  pool.query(
    "SELECT * FROM rooms WHERE hotel_id = $1",
    [hotelId],
    (err, result) => {
      if (err) {
        console.error("Error fetching rooms:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ rooms: result.rows });
    }
  );
});

// POST /hotels/:id/rooms
app.post("/hotels/:id/rooms", (req, res) => {
  const hotelId = parseInt(req.params.id);
  const { room } = req.body;
  if (!room) return res.status(400).json({ error: "Room number is required" });
  pool.query(
    "INSERT INTO rooms (hotel_id, room_number) VALUES ($1, $2) RETURNING *",
    [hotelId, room],
    (err, result) => {
      if (err) {
        console.error("Error adding room:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.status(201).json(result.rows[0]);
    }
  );
});

// DELETE /hotels/:id/rooms/:roomId
app.delete("/hotels/:id/rooms/:roomId", (req, res) => {
  const hotelId = parseInt(req.params.id);
  const roomId = parseInt(req.params.roomId);
  pool.query(
    "DELETE FROM rooms WHERE hotel_id = $1 AND room_number = $2 RETURNING *",
    [hotelId, roomId],
    (err, result) => {
      if (err) {
        console.error("Error deleting room:", err);
        return res.status(500).json({ error: "Database error" });
      }
      if (result.rows.length === 0)
        return res.status(404).json({ error: "Room not found" });
      res.status(204).send();
    }
  );
});

// GET /hotels/:id/rooms
app.get("/hotels/:id/rooms", (req, res) => {
  const hotel = hotels.find((h) => h.id === parseInt(req.params.id));
  if (!hotel) return res.status(404).json({ error: "Hotel not found" });
  res.json({ rooms: hotel.rooms });
});

app.listen(PORT, () => {
  console.log(`Hotel Service running on port ${PORT}`);
});
