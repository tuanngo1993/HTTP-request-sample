// Create a new XMLHttpRequest object (allow to send HTTPRequest)
const xhr = new XMLHttpRequest();

// Configure the request, take 2 args: HTTP method & URL
xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");

// Send the request
xhr.send();