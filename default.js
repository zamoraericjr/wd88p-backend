import http, { request } from "http";

let notes = [
    {
        id:1, 
        content: "HTM is easy",
        important: true,
    },
    {
        id:2, 
        content: "Browser can execute only JS",
        important: false,
    },
    {
        id:3, 
        content: "GET and POST are the most important methods of HTTP",
        important: true,
    }
]

const app = http.createServer((request, response) => {
    // response.writeHead(200, {"Content-Type": "text/plain"});
    // response.end("Hello, NodeJS");
    response.writeHead(200, {"Content-Type": "application/json"});
    response.end(JSON.stringify(notes));
});

const PORT = 3001;  //ihost yung app

app.listen(PORT);
console.log(`Server is now running on port ${PORT}`);