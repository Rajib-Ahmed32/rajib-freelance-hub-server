# ✅ Task Management API

A backend service for managing tasks with full **CRUD operations**.  
Built using **Node.js, Express, and MongoDB** with a modular router structure.


## 🚀 Features

### 📌 Task Management
- **POST /api/tasks** → Create a new task (with proper Date conversion)
- **GET /api/tasks** → Fetch all tasks (with sorting & clean response)
- **GET /api/tasks/:id** → Fetch a single task by ID
- **PUT /api/tasks/:id** → Update a task by ID (with error handling)
- **DELETE /api/tasks/:id** → Delete a task by ID

### 🛠️ Additional Improvements
- Organized routes with modular Express router
- Clean error handling (no debug logs in production)
- Proper date handling for consistency in stored tasks


## 🛠️ Tech Stack
- **Backend:** Node.js, Express
- **Database:** MongoDB + Mongoose



