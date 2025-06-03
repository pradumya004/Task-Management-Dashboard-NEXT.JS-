# Task Management Dashboard

A full-stack task management application with drag-and-drop Kanban board functionality.

## Features

- ✅ Create, edit, and delete tasks
- 📋 Dashboard with task cards and statistics  
- 🎯 Kanban board with drag-and-drop
- 🔍 Filter and sort tasks
- 📱 Responsive design
- ⏰ Due date tracking with overdue detection

## Tech Stack

**Frontend:** Next.js, React, Tailwind CSS, Zustand  
**Backend:** Express.js, MongoDB, Mongoose  
**Extras:** @dnd-kit for drag-and-drop, Axios for API calls

## Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/pradumya004/Task-Management-Dashboard-NEXT.JS-.git
cd Task-Management-Dashboard-NEXT.JS-
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
echo "MONGODB_URI=mongodb://localhost:27017 or your database url
PORT=8000
CORS_ORIGIN=http://localhost:3000" > .env

# Start backend
npm run dev
```

### 3. Frontend Setup  
```bash
cd ../frontend
npm install
npm run dev
```

### 4. Access Application
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000/api

## Project Structure

```
├── frontend/          # Next.js app
│   ├── src/app/       # Pages (dashboard, kanban, task details)
│   ├── src/components/# UI components
│   ├── src/lib/       # API client & utilities
│   └── src/store/     # Zustand state management
├── backend/           # Express.js API
│   ├── src/controllers/# Route handlers
│   ├── src/models/    # MongoDB schemas
│   ├── src/routes/    # API routes
│   └── src/config/    # Database config
```

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/:id` - Get single task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Usage

1. **Create Tasks:** Click "+ Create Task" button
2. **View/Edit:** Click on any task card
3. **Kanban Board:** Navigate to Kanban page and drag tasks between columns
4. **Filter:** Use dropdown filters for status and sorting

## Requirements

- Node.js 18+
- MongoDB (local or Atlas)

That's it! 🚀
