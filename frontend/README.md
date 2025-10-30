# Booking Portal Frontend (React + Vite)

This is the frontend for the Booking Portal system, built with React and Vite. It allows admins to manage hotels, events, and users to browse and book.

## Features

- Admin dashboard for managing hotels, events
- CRUD operations for hotels and events
- Responsive UI (custom or with UI library)

## Environment Variables

Configure API endpoints in `.env`:

```
VITE_HOTEL_API_URL=http://localhost:3001
VITE_EVENT_API_URL=http://localhost:3002
```

## API Usage

API base URLs are set via environment variables and used in `src/api/index.js`:

```
const HOTEL_API_BASE = import.meta.env.VITE_HOTEL_API_URL || "http://localhost/api";
```

## Development

Install dependencies and start the dev server:

```
yarn install
yarn dev
```

or

```
npm install
npm run dev
```

## Build for Production

```
yarn build
```

or

```
npm run build
```

## Docker

Build and run the frontend in Docker:

```
docker build -t <your-username>/bth-booking-frontend:latest .
docker run -p 8080:80 <your-username>/bth-booking-frontend:latest
```

## Kubernetes

Deploy using the provided manifests. Set environment variables in your deployment YAML or ConfigMap.

## License

MIT
