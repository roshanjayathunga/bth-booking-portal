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

## Setup & Deployment

1. **Build Docker Images:**

   - `docker build -t <your-username>/bth-booking-frontend:latest ./frontend`
   - `docker build -t <your-username>/bth-booking-hotel-service:latest ./hotel-service`
   - ...repeat for other services

2. **Push Images to Registry:**

   - `docker push <your-username>/bth-booking-frontend:latest`
   - ...repeat for other services

3. **Create Kubernetes Secrets:**

   - `kubectl create secret generic postgres-secret --from-literal=POSTGRES_PASSWORD=yourpassword`

4. **Apply Kubernetes Manifests:**

   - `kubectl apply -f kubernetes/`

5. **Access Services:**
   - Use `kubectl get svc` to find exposed ports
   - Access frontend at `http://localhost:<port>`

## Environment Variables

Set API URLs in `frontend/.env`:

```
VITE_HOTEL_API_URL=http://localhost:3001
VITE_EVENT_API_URL=http://localhost:3002
```

## Security

- Use Kubernetes Secrets for passwords and sensitive data

## License

MIT
