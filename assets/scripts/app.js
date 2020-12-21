const listWrapper = document.querySelector(".posts");
const singlePost = document.getElementById("single-post");
const fetchBtn = document
	.getElementById("available-posts")
	.querySelector("button");
const submitPostBtn = document.getElementById("new-post").querySelector("form");

// function sendHTTPRequest(method, url, data) {
// 	// // Option 1*: Use XMLHttpRequest()
// 	// const promise = new Promise((resolve, reject) => {
// 	// 	// Create a new XMLHttpRequest object (allow to send HTTPRequest)
// 	// const xhr = new XMLHttpRequest();
// 	// xhr.setRequestHeader("Content-Type", "application/json");

// 	// 	// Configure the request, take 2 args: HTTP method & URL
// 	// 	xhr.open(method, url);

// 	// 	// Option 1*: To format JSON data to Array
// 	// 	xhr.responseType = "json";

// 	// 	// Handle the imcoming response (JSON data)
// 	// 	xhr.onload = function () {
// 	// 		// cosnt listOfPosts = JSON.parse(xhr.response); // Option 2*: Use "parse" method in JSON
// 	// 		if (xhr.status >= 200 && xhr.status < 300) {
// 	// 			resolve(xhr.response);
// 	// 		} else { // Handle non-success status
// 	// 			reject(new Error("Something went wrong!!!"));
// 	// 		}
// 	// 	};
// 	// 	// Trigger if a network error, the request fails, does time out, etc.
// 	// 	xhr.onerror = function () {
// 	// 		reject(new Error("Fail to send a request!!!"));
// 	// 	};

// 	// 	// Send the request
// 	// 	xhr.send(JSON.stringify(data)); // Convert string to JSON
// 	// });

// 	// return promise;

// 	// Option 2: Use fetch() (return a promise), not support for IE
// 	return fetch(url, {
// 		method: method,
// 		body: JSON.stringify(data),
// 		headers: {
// 			"Content-Type": "application/json", // to tell the server my request has JSON data
// 		},
// 	})
// 		.then((repsonse) => {
// 			if (repsonse.status >= 200 && repsonse.status < 300) {
// 				return repsonse.json();   // convert to JSON data
// 			} else {
// 				return repsonse.json().then(errData => {
// 					console.log(errData);
// 					throw new Error("Something went wrong! - server-side");
// 				});
// 			}
// 		})
// 		.catch((err) => {
// 			// Trigger if a network error, the request fails, does time out, etc.
// 			console.log(err);
// 			throw new Error("Something went wrong!");
// 		});
// }

async function fetchPost() {
	listWrapper.innerHTML = "";
	// Option 1**: Use "then"
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

	try {
		// Option 2**: Use "await"
		// const responseData = await sendHTTPRequest(
		// 	"GET",
		// 	"https://jsonplaceholder.typicode.com/posts"
		// );
		// const listOfPosts = responseData;
		
		// Option 3: Use "axios"
		const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
		const listOfPosts = response.data;
		for (const post of listOfPosts) {
			// Create a copy of Node Element
			const postEl = document.importNode(singlePost.content, true);
			postEl.querySelector("h2").textContent = post.title.toUpperCase();
			postEl.querySelector("p").textContent = post.body;
			postEl.querySelector("li").id = post.id;
			listWrapper.appendChild(postEl);
		}
	} catch (err) {
		alert(err.message);
	}
}

async function createPost(title, content) { 
	const newPost = {
		title: title,
		body: content,
		userId: Math.random(),
	};
	// Option 1 or 2: Use XMLHttpRequest or fetch()
	// sendHTTPRequest(
	// 	"POST",
	// 	"https://jsonplaceholder.typicode.com/posts",
	// 	newPost
	// );
	// Option 3: Use "axios"
	axios.post("https://jsonplaceholder.typicode.com/posts", newPost);
}

fetchBtn.addEventListener("click", fetchPost);

submitPostBtn.addEventListener("submit", (e) => {
	e.preventDefault();
	const title = e.currentTarget.querySelector("#title").value;
	const conttent = e.currentTarget.querySelector("#content").value;

	createPost(title, conttent);
});

listWrapper.addEventListener("click", (e) => {
	if (e.target.tagName === "BUTTON") {
		const postId = e.target.closest("li").id;
		// Option 1 or 2: Use XMLHttpRequest or fetch()
		// sendHTTPRequest(
		// 	"DELETE",
		// 	`https://jsonplaceholder.typicode.com/posts/${postId}`
		// );

		// Option 3: Use "axios"
		axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
	}
});
