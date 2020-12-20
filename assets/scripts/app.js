const listWrapper = document.querySelector(".posts");
const singlePost = document.getElementById("single-post");
const fetchBtn = document
	.getElementById("available-posts")
	.querySelector("button");
const submitPostBtn = document.getElementById("new-post").querySelector("form");

function sendHTTPRequest(method, url, data) {
	const promise = new Promise((resolve, reject) => {
		// Create a new XMLHttpRequest object (allow to send HTTPRequest)
		const xhr = new XMLHttpRequest();

		// Configure the request, take 2 args: HTTP method & URL
		xhr.open(method, url);

		// To format JSON data to Array (Option 1)
		xhr.responseType = "json";

		// Handle the imcoming response (JSON data)
		xhr.onload = function () {
			// cosnt listOfPosts = JSON.parse(xhr.response); // Option 2
			resolve(xhr.response);
		};

		// Send the request
		xhr.send(JSON.stringify(data)); // Convert string to JSON
	});

	return promise;
}

async function fetchPost() {
	listWrapper.innerHTML = "";
	// Option 1
	// sendHTTPRequest("GET", "https://jsonplaceholder.typicode.com/posts").then(
	// 	(responseData) => {
	// 		const listOfPosts = responseData;
	// 		for (const post of listOfPosts) {
	// 			// Create a copy of Node Element
	// 			const postEl = document.importNode(singlePost.content, true);
	// 			postEl.querySelector("h2").textContent = post.title.toUpperCase();
	// 			postEl.querySelector("p").textContent = post.body;
	// 			listWrapper.appendChild(postEl);
	// 		}
	// 	}
	// );

	// Option 2
	const responseData = await sendHTTPRequest(
		"GET",
		"https://jsonplaceholder.typicode.com/posts"
	);
	const listOfPosts = responseData;
	for (const post of listOfPosts) {
		// Create a copy of Node Element
		const postEl = document.importNode(singlePost.content, true);
		postEl.querySelector("h2").textContent = post.title.toUpperCase();
		postEl.querySelector("p").textContent = post.body;
		listWrapper.appendChild(postEl);
	}
}

async function createPost(title, content) {
	const newPost = {
		title: title,
		body: content,
		userId: Math.random(),
	};

	sendHTTPRequest(
		"POST",
		"https://jsonplaceholder.typicode.com/posts",
		newPost
	);
}

fetchBtn.addEventListener("click", fetchPost);

submitPostBtn.addEventListener("submit", (e) => {
	e.preventDefault();
	const title = e.currentTarget.querySelector("#title").value;
	const conttent = e.currentTarget.querySelector("#content").value;

	createPost(title, conttent);
});
