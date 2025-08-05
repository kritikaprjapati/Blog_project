// 1. Import necessary modules (dependencies)
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// 2. Initialize the Express application
const app = express();
const PORT = 3000; // Define the port your server will listen on

// 3. Apply Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse incoming request bodies with JSON payloads

// 4. Hypothetical "Database" (In-Memory Array)
//    IMPORTANT: This data is LOST when the server restarts.
//    For real persistence, you would use a proper database (e.g., MongoDB, PostgreSQL).
let posts = [
    {
        id: 1,
        title: "The Joys of Web Development",
        date: "July 19, 2025",
        image: "https://via.placeholder.com/600x300?text=Web+Dev+Fun",
        content: "Learning web development has been an incredibly rewarding journey. From the satisfaction of seeing your code come to life in a browser to the endless possibilities of what you can create, it's a field that keeps you on your toes. HTML provides the structure, CSS adds the style, and JavaScript brings the interactivity. Together, they form the foundation of almost every website you interact with daily.",
        comments: [
            { name: "Alice", message: "Great post! Very insightful.", timestamp: "July 20, 2025, 10:00 AM" },
            { name: "Bob", message: "I agree, web dev is awesome!", timestamp: "July 20, 2025, 11:30 AM" }
        ]
    },
    {
        id: 2,
        title: "Mastering CSS Flexbox for Layouts",
        date: "July 15, 2025",
        image: "https://via.placeholder.com/600x300?text=CSS+Flexbox",
        content: "Flexbox is a powerful one-dimensional layout system that helps you design complex, responsive layouts with ease. Understanding its core concepts like main-axis, cross-axis, justify-content, and align-items is key to leveraging its full potential. It simplifies alignment and distribution of space among items in a container, making it indispensable for modern web design.",
        comments: [
            { name: "Charlie", message: "Flexbox changed my life!", timestamp: "July 16, 2025, 09:15 AM" }
        ]
    },
    {
        id: 3,
        title: "Introduction to JavaScript ES6 Features",
        date: "July 10, 2025",
        image: "https://via.placeholder.com/600x300?text=JavaScript+ES6",
        content: "ECMAScript 2015 (ES6) introduced many new features to JavaScript that significantly improved developer experience and code readability. Key additions include arrow functions, 'let' and 'const' for variable declarations, template literals, destructuring, modules, and classes. Embracing these features is essential for writing modern, maintainable JavaScript code.",
        comments: []
    }
];

// This counter helps assign unique IDs to new posts.
let postIdCounter = posts.length > 0 ? Math.max(...posts.map(p => p.id)) : 0;


// 5. Define API Endpoints (Routes)

// GET all posts: Sends the current list of blog posts to the client.
app.get('/api/posts', (req, res) => {
    console.log('GET /api/posts requested');
    res.json(posts); // Send the posts array as a JSON response
});

// POST a new post: Receives new post data from the client and adds it to the list.
app.post('/api/posts', (req, res) => {
    console.log('POST /api/posts requested with body:', req.body);

    const { title, content, image, date } = req.body;

    // Basic server-side validation
    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required for a new post.' });
    }

    // Create the new post object
    const newPost = {
        id: ++postIdCounter, // Increment and assign new unique ID
        title,
        content,
        image: image || 'https://via.placeholder.com/600x300?text=No+Image+Provided', // Use provided image or default
        date: date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        comments: [] // New posts always start with an empty comments array
    };

    // Add the new post to our in-memory array
    posts.push(newPost);

    // Send back the newly created post with a 201 Created status
    res.status(201).json(newPost);
});

// 6. Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`To view your blog, open index.html in your browser.`);
    console.log(`(Remember to keep this terminal window open while working)`);
});