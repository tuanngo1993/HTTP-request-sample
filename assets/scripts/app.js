const listWrapper = document.querySelector(".posts");
const singlePost = document.getElementById("single-post");

// Create a new XMLHttpRequest object (allow to send HTTPRequest)
const xhr = new XMLHttpRequest();

// Configure the request, take 2 args: HTTP method & URL
xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");

// To format JSON data to Array (Option 1)
xhr.responseType = "json";

// Handle the imcoming response (JSON data)
xhr.onload = function() {
	// cosnt listOfPosts = JSON.parse(xhr.response); // Option 2
	const listOfPosts = xhr.response;
	for (const post of listOfPosts) {
		// Create a copy of Node Element
		const postEl = document.importNode(singlePost.content, true);
		postEl.querySelector("h2").textContent = post.title.toUpperCase();
		postEl.querySelector("p").textContent = post.body;
		listWrapper.appendChild(postEl);
	}
};

// Send the request
xhr.send();