const API_URL = 'http://localhost:3000/api/posts';

const blogPostsContainer = document.getElementById('blog-posts-container');
const mainNav = document.getElementById('main-nav'); 

let blogPostsData = []; // This array will hold the blog posts fetched from the server

// Function to fetch posts from the backend API
async function fetchPosts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            // Handle HTTP errors (e.g., 404 Not Found, 500 Server Error)
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parse the JSON data from the response
        blogPostsData = await response.json();
        // Once data is fetched, render the posts on the page
        renderPosts();
    } catch (error) {
        // Catch any network errors or errors thrown above
        console.error('Error fetching blog posts:', error);
        blogPostsContainer.innerHTML = `
            <p style="text-align: center; color: var(--text-dark); margin-top: 50px;">
                Failed to load blog posts. Please ensure your backend server is running and accessible.<br>
                Try running 'node server.js' in your project folder.
            </p>`;
    }
}

// Function to render blog posts on the page
function renderPosts() {
    blogPostsContainer.innerHTML = ''; // Clear any existing content in the container

    if (blogPostsData.length === 0) {
        blogPostsContainer.innerHTML = `
            <p style="text-align: center; color: var(--text-dark); margin-top: 50px;">
                No blog posts found. <a href="new-post.html" style="color: var(--primary-blue); text-decoration: none; font-weight: bold;">Be the first to add one!</a>
            </p>`;
        return;
    }

    // Loop through each post in the blogPostsData array
    blogPostsData.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('blog-post'); // Add the 'blog-post' class for styling
        postElement.id = `post-${post.id}`; // Assign a unique ID to the post element

        // Populate the inner HTML of the post element using template literals
        // Includes title, date, image, content, and the comment section structure
        // Added onerror to img for graceful fallback if image URL is broken
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p class="meta">Published on ${post.date}</p>
            <img src="${post.image}" alt="${post.title}" onerror="this.onerror=null;this.src='https://via.placeholder.com/600x300?text=Image+Not+Found';">
            <p>${post.content}</p>
            <div class="comment-section">
                <h3>Comments</h3>
                <div class="comments-list" id="comments-post-${post.id}">
                    </div>
                <form class="comment-form" data-post-id="${post.id}">
                    <input type="text" placeholder="Your Name" required>
                    <textarea placeholder="Your Comment" rows="4" required></textarea>
                    <button type="submit">Submit Comment</button>
                </form>
            </div>
        `;
        // Append the newly created post element to the main blog posts container
        blogPostsContainer.appendChild(postElement);
    });

    // Attach event listeners for all comment forms after they have been added to the DOM
    document.querySelectorAll('.comment-form').forEach(form => {
        form.addEventListener('submit', handleCommentSubmit);
    });

    // Render comments for each post (assuming comments are part of the fetched post object initially)
    blogPostsData.forEach(post => {
        renderComments(post.id);
    });
}

// Function to handle comment submission
function handleCommentSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior (page reload)

    const form = event.target;
    const postId = form.dataset.postId; // Get the post ID from the form's data attribute
    const nameInput = form.querySelector('input[type="text"]');
    const commentTextArea = form.querySelector('textarea');

    const userName = nameInput.value.trim(); // Get and trim the user's name
    const userComment = commentTextArea.value.trim(); // Get and trim the user's comment

    if (userName && userComment) { // Check if both fields are not empty
        // Find the specific post in our data array
        const post = blogPostsData.find(p => p.id == postId);
        if (post) {
            // Create a new comment object
            const newComment = {
                name: userName,
                message: userComment,
                timestamp: new Date().toLocaleString() // Get current date and time
            };
            
            post.comments.push(newComment);

            renderComments(postId); // Re-render comments for this specific post to show the new one

            // Clear the form fields after successful submission
            nameInput.value = '';
            commentTextArea.value = '';
        }
    } else {
        alert('Please enter your name and comment.'); // Alert if fields are empty
    }
}

// Function to render comments for a specific post
function renderComments(postId) {
    const post = blogPostsData.find(p => p.id == postId); // Find the post by ID
    if (post) {
        const commentsListDiv = document.getElementById(`comments-post-${postId}`);
        commentsListDiv.innerHTML = ''; // Clear any existing comments before rendering

        if (!post.comments || post.comments.length === 0) {
            commentsListDiv.innerHTML = '<p>No comments yet. Be the first to comment!</p>';
            return;
        }

        // Loop through each comment for the post and create its HTML
        post.comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.innerHTML = `
                <strong>${comment.name}</strong> (${comment.timestamp})<br>
                <span>${comment.message}</span>
            `;
            commentsListDiv.appendChild(commentDiv); // Append comment to the comments list
        });
    }
}

// Initial call to fetch posts when the script loads the index.html page
fetchPosts();