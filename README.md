# Todo App (MERN Stack)

A simple Todo application with a React frontend and Node.js/Express/MongoDB backend. 

## Deployment Instructions

### 1. Backend (Recommended: Render, Railway, or similar)
- Copy `backend/.env.example` to `backend/.env` and set your MongoDB URI (e.g., from MongoDB Atlas).
- Deploy the backend folder to your preferred Node.js host.
- Make sure the backend is accessible via a public URL (e.g., `https://your-backend.onrender.com`).

### 2. Frontend (Vercel)
- Copy `frontend/.env.example` to `frontend/.env`.
- Set `VITE_API_URL` to your backend's deployed API endpoint, e.g.:
  ```
  VITE_API_URL=https://your-backend.onrender.com/api/todos
  ```
- Deploy the `frontend` folder to Vercel.

### 3. Environment Variables
- Never commit your real `.env` files. Use `.env.example` for reference.
- Set environment variables in the Vercel/Render dashboard for production.

### 4. MongoDB
- Use a cloud MongoDB provider (e.g., MongoDB Atlas) for production.
- Update `MONGODB_URI` in your backend's environment variables.

### 5. Notes
- This app does not have authentication. Anyone can view, add, update, or delete todos.
- For a multi-user app, add authentication and user-specific data.

---

## Local Development

- Backend: `cd backend && npm install && npm start`
- Frontend: `cd frontend && npm install && npm run dev`

---

## File Structure

```
Todo/
  backend/
    index.js
    package.json
    .env.example
  frontend/
    src/
      App.jsx
      App.css
      index.css
    .env.example
    package.json
```

---

## License
MIT
