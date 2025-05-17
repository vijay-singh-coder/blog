# MERN Blog App

A full-stack blog application built with the MERN stack (MongoDB, Express, React, Node.js). This app allows users to create, read, update, and delete blog posts, with user authentication and image upload features.

---

## Features

- User authentication (signup, login) with JWT
- Create, read, update, and delete blog posts (CRUD)
- Upload images for blog posts
- Responsive and clean UI built with React and Tailwind CSS
- Protected routes for authenticated users
- Dashboard to manage posts easily
- Comments section (optional if implemented)

---

## Tech Stack

- **Frontend:** React, React Router, Tailwind CSS, React Query (optional)
- **Backend:** Node.js, Express.js, JWT Authentication
- **Database:** MongoDB, Mongoose ODM
- **Other:** Multer for image upload, Axios for API calls

---

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB instance (local or Atlas)

### Installation

1. Clone the repo

   ```bash
   git clone https://github.com/yourusername/mern-blog-app.git
   cd mern-blog-app
   ```

2. Setup Backend

   ```bash
   cd backend
   npm install
   ```

3. Setup Frontend

   ```bash
   cd ../frontend
   npm install
   ```

### Configuration

Create a `.env` file in the backend folder and add your environment variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

---

## Running the App

### Run Backend

```bash
cd backend
npm run dev
```

### Run Frontend

```bash
cd frontend
npm start
```

The frontend will be available at `http://localhost:3000` and the backend server at `http://localhost:5000`.

---

## API Endpoints

### 🔐 Authentication

- `POST /api/auth/signup` — Register user (with optional profile picture)
- `POST /api/auth/login` — Login user
- `GET /api/auth/dashboard` — Get logged-in user’s dashboard
- `GET /api/auth/logout` — Logout user

### 📝 Blog Posts

- `POST /api/posts` — Create new blog post (auth + image)
- `GET /api/posts` — Get all blog posts
- `GET /api/posts/:id` — Get single blog post
- `GET /api/posts/my-blogs` — Get current user’s blogs (auth)
- `PUT /api/posts/:id` — Update a blog post (auth + optional image)
- `DELETE /api/posts/:id` — Delete a blog post (auth)

### 💬 Comments (Optional)

- `POST /api/blogs/:id/comments` — Add comment (auth)
- `POST /api/comments/:id/reply` — Reply to a comment (auth)

---

## Contributing

Contributions are welcome! Feel free to open issues or pull requests to improve the app.

---

## License

This project is licensed under the MIT License.
