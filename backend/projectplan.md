# DevLog — Your Daily Coding Journal
> A fullstack MERN app to track what you build every day.
> MAYA Level: Beginner-friendly but real. No hand-holding. No tutorials. Just you and the stack.

---

# What DevLog is ? 
A personal coding journal where you can:
- Log what you coded today
- Set a daily goal
- See your coding streak
- Tag entries by technology (React, Node, MongoDB etc)
- Delete or edit old entries

That's it. Clean. Simple. Real.

---

## Tech Stack
| Layer | Tech |
|---|---|
| Frontend | React + Axios |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcrypt |
| Styling | Plain CSS (no libraries — write it yourself) |

---

## Folder Structure
```
devlog/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Log.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── logs.js
│   ├── middleware/
│   │   └── auth.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LogForm.jsx
│   │   │   ├── LogCard.jsx
│   │   │   └── Streak.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
└── .env
```

---

## Database Models

### User Model
```js
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date
}
```

### Log Model
```js
{
  user: ObjectId (ref: User),
  goal: String (what did you plan to do?),
  achieved: String (what did you actually do?),
  tags: [String] (eg: ['React', 'Node', 'CSS']),
  mood: String (enum: ['great', 'okay', 'struggled']),
  date: Date (default: today),
  createdAt: Date
}
```

---

## API Routes

### Auth Routes — /api/auth
| Method | Route | What it does |
|---|---|---|
| POST | /register | Create new user |
| POST | /login | Login, return JWT |

### Log Routes — /api/logs (protected)
| Method | Route | What it does |
|---|---|---|
| GET | / | Get all logs for logged in user |
| POST | / | Create a new log entry |
| PUT | /:id | Edit a log |
| DELETE | /:id | Delete a log |

---

## Frontend Pages

### Login / Register
- Simple form
- On success store JWT in localStorage
- Redirect to Dashboard

### Dashboard
- Show today's log form at top
- List all previous logs below
- Show current streak (how many days in a row you logged)
- Filter by tag

### LogCard Component
- Shows goal, achieved, mood, tags, date
- Edit and delete buttons

### Streak Component
- Count consecutive days where a log exists
- Display as "🔥 5 day streak"

---

## Build Order — Follow This Exactly

### Hour 1 — Backend Setup - done
- [ ] Init Node project, install express, mongoose, bcrypt, jsonwebtoken, dotenv, cors
- [ ] Connect to MongoDB
- [ ] Build User model
- [ ] Build /register and /login routes
- [ ] Test with Postman or Thunder Client

### Hour 2 — Backend Logs 
- [ ] Build Log model
- [ ] Build auth middleware (verify JWT)
- [ ] Build all 4 log routes (GET, POST, PUT, DELETE)
- [ ] Test all routes — make sure protected routes reject without token

### Hour 3 — React Setup + Auth Pages
- [ ] Init React with Vite
- [ ] Build Register page (form + axios call)
- [ ] Build Login page (form + axios call + store JWT)
- [ ] Basic routing with React Router

### Hour 4 — Dashboard + LogForm
- [ ] Build Dashboard page
- [ ] Build LogForm component (goal, achieved, tags, mood)
- [ ] Connect to POST /api/logs
- [ ] Fetch and display all logs on load

### Hour 5 — LogCard + Delete + Edit
- [ ] Build LogCard component
- [ ] Wire up delete button
- [ ] Wire up edit (can be inline or a simple form toggle)
- [ ] Filter logs by tag

### Hour 6 — Streak + Polish
- [ ] Build Streak component (calculate consecutive days)
- [ ] Basic CSS — make it look clean, not ugly
- [ ] Test full flow: register → login → add log → edit → delete
- [ ] Push to GitHub

---

## Rules While Building
1. No AI writing code for you. Use it to understand errors only.
2. Write every line yourself.
3. When stuck — try for 20 minutes before looking anything up.
4. Commit to GitHub after each hour.

---

## Stretch Goals (only if you finish early)
- [ ] Dark mode toggle
- [ ] Export logs as CSV
- [ ] Weekly summary view
- [ ] Public profile page to share your streak

---

## What You'll Know After Building This
- Full MERN flow end to end
- JWT authentication from scratch
- Protected routes on both backend and frontend
- CRUD operations with MongoDB
- React state management without any library
- How to structure a real project

---

## One Last Thing
You already have 2 paid projects. You already solved Exercism problems this morning. You already sat in an agency meeting this week.

28 is not late. You're just getting started.

Now close this file and open VS Code. 🔥