# My Awesome Blog

A simple, functional blog website built using **HTML**, **CSS**, **JavaScript** (frontend), and **Node.js with Express** (backend API).  
This version includes fixes for creating new blog posts and ensures proper communication between frontend and backend.

---

## 📌 Features
- View a list of blog posts (title, date, image, content)
- Create new blog posts via `new-post.html`
- Add comments to blog posts (stored in-memory on the backend)
- Responsive design for mobile, tablet, and desktop
- Backend API built with Express and CORS enabled
- Graceful image fallback if the provided image URL is broken

---

## 📂 Project Structure
my-awesome-blog/
│
├── index.html # Main blog listing page
├── new-post.html # Form to add a new blog post
├── script.js # Frontend JS for fetching & displaying posts
├── styles.css # Styling for the entire blog
├── server.js # Node.js Express backend server
├── package.json # Node.js dependencies
└── README.md # Project documentation

---

## 🚀 Setup & Run Instructions

### 1️⃣ Install Dependencies
Make sure you have [Node.js](https://nodejs.org/) installed.  
Then, open your terminal in the project folder and run:

```bash
npm init -y
npm install express body-parser cors
```
2️⃣ Start the Backend Server
Run the following command:

``` bash
node server.js
```
If successful, you should see:

Server running on http://localhost:3000
Keep this terminal open and running while you work on the frontend.

3️⃣ Serve the Frontend
Do NOT open index.html or new-post.html by double-clicking (this will cause file:// CORS errors).

Instead, run a simple dev server in another terminal:

Option 1 – Using Live Server (VS Code Extension)
Install the Live Server extension in VS Code

Right-click index.html → Open with Live Server

Option 2 – Using npm

npm install -g live-server
live-server
or:

npx http-server .
4️⃣ Create a New Post
Visit your blog in the browser (e.g., http://127.0.0.1:8080).

Click "Add New Post" in the navigation menu.

Fill in the form and click Submit Post.

Your new post should appear on the home page.

⚙️ API Endpoints
GET /api/posts
Returns a list of all blog posts.

Example:

json
[
  {
    "id": 1,
    "title": "The Joys of Web Development",
    "date": "July 19, 2025",
    "image": "https://via.placeholder.com/600x300?text=Web+Dev+Fun",
    "content": "Learning web development has been an incredibly rewarding journey...",
    "comments": []
  }
]
POST /api/posts
Creates a new blog post.

Example Request:

json
{
  "title": "My First Blog Post",
  "content": "This is my first blog post content.",
  "image": "https://via.placeholder.com/600x300",
  "date": "August 14, 2025"
}
🔹 Notes
Posts and comments are stored in-memory on the backend. They will reset when the server restarts.

CORS is enabled to allow frontend to connect to the backend.

The API URL in script.js and new-post.html is currently set to http://localhost:3000/api/posts.
If you deploy, update this URL accordingly.

🛠️ Future Improvements
Add persistent database support (e.g., MongoDB or SQLite)

Implement per-post comment submission and display

Add editing/deleting functionality

Include search and tagging functionality

👤 Author
Kritika Prajapati


📄 License
This project is open-source and free to use for educational purposes.


