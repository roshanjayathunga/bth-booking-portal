# Booking Portal Project

This project is a microservices-based booking portal for managing hotels, events, and bookings. It uses Node.js/Express for backend services, React (Vite) for the frontend, PostgreSQL for the database, and is orchestrated with Docker and Kubernetes.

## Architecture Overview

- **Frontend:** React + Vite app for admin and user interaction
- **Backend Services:** Node.js/Express microservices (hotel-service, event-service, booking-service)
- **Database:** PostgreSQL with persistent storage
- **Containerization:** Docker for all services
- **Orchestration:** Kubernetes for deployment, scaling, and networking
- **Secrets Management:** Kubernetes Secrets for sensitive data

## Main Components

- `frontend/` — React app (admin dashboard, CRUD, booking management)
- `hotel-service/`, `event-service/` — Node.js/Express APIs
- `postgres/` — PostgreSQL database
- `kubernetes/` — Deployment, service, ingress, and PVC manifests

## Security

- Use Kubernetes Secrets for passwords and sensitive data

## License

MIT
