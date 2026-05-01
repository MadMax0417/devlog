# DevLog

DevLog is a full-stack journal app for tracking what you build every day.
It is still in progress, and this repo reflects the current build phase of the project.



## What It Is

DevLog is a simple coding journal where you can:

- write down what you want to do today
- record what you actually did
- keep a streak of consistent logging
- tag entries by technology
- edit or delete older entries

The goal is to keep it clean, honest, and distraction-free.

## Current Status

This project is still under active development.

What is currently in place:

- landing page sections
- static sign-in and sign-up UI
- backend Express app structure
- MongoDB connection setup
- auth and log route scaffolding
- JWT-based login flow work

What is still being built:

- dashboard logic
- full log form flow
- edit and delete UX
- streak calculation
- frontend-backend wiring cleanup

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Zustand
- Tailwind CSS

### Backend

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- JWT
- bcrypt

## Project Structure

```txt
devlog/
├── backend/
│   └── src/
│       ├── controllers/
│       ├── lib/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── schemas/
│       └── app.ts
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── stores/
│       └── main.tsx
└── README.md
```

## Setup

### 1. Clone the repo

```bash
git clone <repo-url>
cd devlog
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

```bash
cd ../backend
pnpm install
```

## Environment Variables

Create a `.env` file inside `backend/` with values like these:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
MONGODB_APP_NAME=devlog
JWT_SECRET=your_jwt_secret
DEV_URL=http://localhost:5173
PROD_URL=https://your-production-url.com
ENVIRONMENT=dev
```

## Run The App

### Frontend

```bash
cd frontend
npm run dev
```

### Backend

```bash
cd backend
pnpm dev
```

## Build

### Frontend

```bash
cd frontend
npm run build
```

### Backend

```bash
cd backend
pnpm build
```

## Current API Routes

### Auth

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`

### Logs

- `GET /api/v1/log`
- `GET /api/v1/log/:id`
- `POST /api/v1/log`
- `PUT /api/v1/log/:id`
- `DELETE /api/v1/log/:id`

### Health

- `GET /api/v1/health`

## Planned Features

From the project plan, the next major items are:

- log form on the dashboard
- log cards with edit and delete
- tag filtering
- streak display
- polish and full flow testing

## Notes

- The frontend is currently styled with Tailwind while the app is being shaped.
- Some pages are still static shells and will get real data flow later.
- The backend already has route structure and auth groundwork in place.

