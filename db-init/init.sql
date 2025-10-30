-- Hotels table
CREATE TABLE IF NOT EXISTS hotels (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL
);

-- Rooms table
CREATE TABLE IF NOT EXISTS rooms (
	id SERIAL PRIMARY KEY,
	hotel_id INTEGER REFERENCES hotels(id) ON DELETE CASCADE,
	room_number INTEGER NOT NULL
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	venue VARCHAR(255),
	date DATE,
	description TEXT
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
	id SERIAL PRIMARY KEY,
	hotel_id INTEGER REFERENCES hotels(id) ON DELETE SET NULL,
	event_id INTEGER REFERENCES events(id) ON DELETE SET NULL,
	user_name VARCHAR(255) NOT NULL,
	booking_date DATE NOT NULL,
	status VARCHAR(50) DEFAULT 'pending',
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Initial hotel data
INSERT INTO hotels (name) VALUES ('Hotel Sunshine'), ('Hotel Paradise');
INSERT INTO rooms (hotel_id, room_number) VALUES (1, 101), (1, 102), (2, 201);

-- Initial event data
INSERT INTO events (name, venue, date, description) VALUES
	('Tech Conference', 'Grand Hall', '2025-11-10', 'A conference for tech enthusiasts.'),
	('Music Festival', 'Open Grounds', '2025-12-05', 'Annual music festival.');

-- Initial booking data
INSERT INTO bookings (hotel_id, event_id, user_name, booking_date, status)
VALUES (1, NULL, 'Alice', '2025-11-10', 'confirmed'),
			 (NULL, 2, 'Bob', '2025-12-05', 'pending');
