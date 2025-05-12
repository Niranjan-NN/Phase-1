# TaskMaster - Task Management Application

TaskMaster is a full-stack task management application built with React and Node.js.

## Features

- User authentication (register, login, logout)
- Create, read, update, and delete tasks
- Task filtering (completed vs. pending)
- Due date tracking
- Responsive design

## Tech Stack

### Frontend
- React (with Vite)
- React Router
- Context API for state management
- TailwindCSS for styling
- Axios for API requests

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Setup

1. Clone the repository

```bash
git clone https://github.com/yourusername/taskmaster.git
cd taskmaster
```

2. Install dependencies

```bash
npm install
```

3. Environment variables
   
Create a `.env` file in the root directory and add the following variables (or use the provided `.env.example`):

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmaster
JWT_SECRET=yoursecretkey123
NODE_ENV=development
```

Replace the `MONGO_URI` with your MongoDB connection string and set a secure `JWT_SECRET`.

4. Run the application

Development mode (runs both frontend and backend concurrently):
```bash
npm run dev
```

Run frontend only:
```bash
npm run dev:frontend
```

Run backend only:
```bash
npm run dev:backend
```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/me` - Get user profile (protected)

### Tasks
- `GET /api/tasks` - Get all tasks (protected)
- `POST /api/tasks` - Create a new task (protected)
- `GET /api/tasks/:id` - Get task by ID (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)
- `PATCH /api/tasks/:id/toggle` - Toggle task completion (protected)

## Deployment

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

## License

MIT