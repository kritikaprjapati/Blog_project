# 📝 My Awesome Blog

A simple full-stack blog web application built using **HTML**, **CSS**, **JavaScript**, and **Node.js (Express)**. This blog allows users to view posts, add new posts, and leave comments.

---

## 🎯 Project Features

### 📰 Blog Front-End
- Displays a list of blog posts dynamically.
- Each post includes:
  - Title
  - Image
  - Date of publication
  - Content
  - Comments
- Navigation bar to switch between blog list and post submission form.

### ✍️ Create New Blog Post
- `new-post.html` includes a form to add:
  - Title
  - Content
  - Optional Image URL
- Submits post data to the backend using `fetch()` and POST request.
- Auto-redirects back to the main blog page on success.

### 💬 Comment Support *(in-progress or optional)*
- Each post includes a comments array (display logic can be added in `script.js`).
- Structure supports future enhancements for comment submission per post.

---

## 📁 Folder Structure

blog-project/
│
├── index.html # Home page with blog post list
├── new-post.html # Page to create new posts
├── styles.css # Styling for the blog
├── script.js # Client-side JavaScript
├── server.js # Express backend server
└── images/ # Folder for image 

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash

cd blog-project

2. Install Backend Dependencies
Make sure Node.js is installed.

npm install express body-parser cors
3. Start the Backend Server

node server.js
This will run the server on:
🌐 http://localhost:3000

4. Run the Frontend
You can simply open index.html in your browser.
To avoid CORS issues or for better development flow, use a Live Server extension in VS Code or serve it with any static server.

📡 API Endpoints
GET /api/posts
Fetches all blog posts.

POST /api/posts
Accepts a JSON body with:

json

{
  "title": "Post Title",
  "content": "Post content",
  "image": "Optional image URL",
  "date": "Optional date string"
}
Adds the post to the in-memory database.

⚙️ Tech Stack
Frontend: HTML5, CSS3, JavaScript 

Backend: Node.js, Express.js

API: RESTful endpoints

Database: In-memory (array-based)

🔒 Note: Posts are not saved permanently. Restarting the server will reset all data.

📱 Responsiveness
The website layout is designed to be responsive and adjusts across different screen sizes using CSS media queries.

🛠️ Future Improvements
Add persistent database support (e.g., MongoDB or SQLite)

Implement per-post comment submission and display

Add editing/deleting functionality

Include search and tagging functionality

👤 Author
Kritika Prajapati


📄 License
This project is open-source and free to use for educational purposes.

