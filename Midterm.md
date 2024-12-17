1## What is the default port for HTTP/HTTPS/SSH?  
HTTP: Port 80
HTTPS: Port 443
SSH: Port 22

2## What does an HTTP status code in the range of 300/400/500 indicate?
. 300 Range (Redirection)
Purpose: These codes indicate that the client must take additional action to complete the request, typically through a redirection.
400 Range (Client Errors)
Purpose: These codes indicate that the client has made a bad request, meaning there was something wrong with the request sent to the server.
500 Range (Server Errors)
Purpose: These codes indicate that there was an error on the server side, preventing it from fulfilling the request.

3## What does the HTTP header content-type allow you to do?
The Content-Type HTTP header is used to specify the media type (also known as MIME type) of the resource being sent in the request or response body. This header informs the recipient (whether it's a browser, server, or API client) about the type of data being transferred, so it can process the content correctly.
Key uses of Content-Type:
Indicate the format of the request/response body:
When sending data to a server (in a POST or PUT request), the Content-Type header tells the server what kind of data the client is sending, so the server can interpret it correctly.
Similarly, when the server responds to a request, it uses Content-Type to tell the client what kind of data is in the response body, so the client knows how to handle it (e.g., display it, parse it).
Enable proper data processing:
By specifying the Content-Type, both the client and server can ensure that they are both working with the correct data format. For example, if the client sends JSON data, the server knows to parse it as JSON. If the server sends an HTML page, the browser knows to render it as HTML.
POST /api/resource HTTP/1.1
Content-Type: application/json

{ "name": "John", "age": 30 }

4## What does a “Secure cookie”/”Http-only cookie”/”Same-site cookie” do? https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
The terms "Secure cookie," "HttpOnly cookie," and "SameSite cookie" all refer to different security-related attributes that can be set for cookies to help protect user data and improve the security of web applications. Here's what each one does:
1. Secure Cookie
Purpose: A Secure cookie is only sent over HTTPS connections, ensuring that it is transmitted securely.
HttpOnly Cookie
Purpose: An HttpOnly cookie is inaccessible to JavaScript running in the browser, which helps protect against cross-site scripting (XSS) attacks.
SameSite Cookie
Purpose: The SameSite cookie attribute restricts how cookies are sent with cross-site requests, reducing the risk of cross-site request forgery (CSRF) attacks.

5## Assuming the following Express middleware, what would be the console.log output for an HTTP GET request with a URL path of /api/document?
app.use((req, res, next) => {
  console.log('Middleware 1');
  next();  // Pass control to the next middleware
});


6## Given the following Express service code: What does the following front end JavaScript that performs a fetch return?
app.get('/api/document', (req, res) => {
  res.status(200).json({
    message: 'Document data fetched successfully',
    data: { id: 1, title: 'Example Document', content: 'This is an example document.' }
  });
});
fetch('http://localhost:3000/api/document')
  .then(response => response.json())  // Parse the JSON response
  .then(data => {
    console.log(data);  // Log the data returned from the backend
  })
  .catch(error => {
    console.error('Error fetching data:', error);  // Log any errors
  });
RETURNS: "message": "Document data fetched successfully",
  "data": {
    "id": 1,
    "title": "Example Document",
    "content": "This is an example document."

7## Given the following MongoDB query, select all of the matching documents {name:Mark}
async function fetchDocuments() {
  const client = new MongoClient('mongodb://localhost:27017'); // Connection URI
  try {
    await client.connect();
    const db = client.db('yourDatabaseName');  // Replace with your database name
    const collection = db.collection('yourCollectionName');  // Replace with your collection name

    const documents = await collection.find({ name: "Mark" }).toArray();
    console.log(documents);  // Logs the matching documents
  } finally {
    await client.close();

{ "_id": 1, "name": "Mark", "age": 30 }

8## How should user passwords be stored?
Hash the Password
bcrypt: A widely-used, secure hashing algorithm specifically designed for passwords. It automatically handles salting and is resistant to brute-force and rainbow table attacks.
argon2: Another modern and secure hashing algorithm. It is the winner of the Password Hashing Competition (PHC) and is considered very secure and efficient.
scrypt: A password-based key derivation function designed to be computationally expensive to thwart brute-force attacks.
salt the thing i think

9## Assuming the following node.js websocket code in the back end, and the following front end websocket code, what will the front end log to the console?
wss.on('connection', (ws) => {
  console.log('New connection established');

  // Send a message to the client when a connection is made
  ws.send('Hello from server!');

  // Listen for messages from the client
  ws.on('message', (message) => {
    console.log('Received message from client:', message);

    // Echo the message back to the client
    ws.send(`Server received: ${message}`);

    socket.onopen = () => {
  console.log('WebSocket connection established');

  // Send a message to the server after the connection is open
  socket.send('Hello from client!');
};

// Log messages received from the server
socket.onmessage = (event) => {
  console.log('Received from server:', event.data);
};

// Log any errors
socket.onerror = (error) => {
  console.error('WebSocket Error:', error);
};

10## What is the websocket protocol intended to provide?


11## What do the following acronyms stand for? JSX, JS, AWS, NPM, NVM


12## Assuming an HTML document with a body element. What text content will the following React component generate?  The react component will use parameters.


13## Given a set of React components that include each other, what will be generated


14## What does a React component with React.useState do?


15## What are React Hooks used for?


16## What does the State Hook/Context Hook/Ref Hook/Effect Hook/Performance Hook do? https://react.dev/reference/react/hooks


17## Given React Router code, select statements that are true.


18## What does the package.json file do?


19## What does the fetch function do?


20## What does node.js do?


21## What does pm2 do?


22## What does Vite do?


