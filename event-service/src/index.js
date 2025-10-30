const express = require("express");
const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
const cors = require("cors");
app.use(cors());

const pool = require("./db");

app.get("/events", (req, res) => {
  pool.query("SELECT * FROM events", (err, result) => {
    if (err) {
      console.error("Error fetching events:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result.rows);
  });
});

// GET /events/:id
app.get("/events/:id", (req, res) => {
  const eventId = parseInt(req.params.id);
  pool.query("SELECT * FROM events WHERE id = $1", [eventId], (err, result) => {
    if (err) {
      console.error("Error fetching event:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Event not found" });
    res.json(result.rows[0]);
  });
});

// POST /events
app.post("/events", (req, res) => {
  const { name, venue, date, description } = req.body;
  if (!name) return res.status(400).json({ error: "Event name is required" });
  pool.query(
    "INSERT INTO events (name, venue, date, description) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, venue, date, description],
    (err, result) => {
      if (err) {
        console.error("Error creating event:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.status(201).json(result.rows[0]);
    }
  );
});

// PUT /events/:id
app.put("/events/:id", (req, res) => {
  const eventId = parseInt(req.params.id);
  const { name, venue, date, description } = req.body;
  pool.query(
    "UPDATE events SET name = $1, venue = $2, date = $3, description = $4 WHERE id = $5 RETURNING *",
    [name, venue, date, description, eventId],
    (err, result) => {
      if (err) {
        console.error("Error updating event:", err);
        return res.status(500).json({ error: "Database error" });
      }
      if (result.rows.length === 0)
        return res.status(404).json({ error: "Event not found" });
      res.json(result.rows[0]);
    }
  );
});

// DELETE /events/:id
app.delete("/events/:id", (req, res) => {
  const eventId = parseInt(req.params.id);
  pool.query(
    "DELETE FROM events WHERE id = $1 RETURNING *",
    [eventId],
    (err, result) => {
      if (err) {
        console.error("Error deleting event:", err);
        return res.status(500).json({ error: "Database error" });
      }
      if (result.rows.length === 0)
        return res.status(404).json({ error: "Event not found" });
      res.status(204).send();
    }
  );
});

app.listen(PORT, () => {
  console.log(`Event Service running on port ${PORT}`);
});
