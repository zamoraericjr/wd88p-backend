import express, { response } from "express";
import morgan from "morgan";
import cors from "cors";

const PORT = process.env.PORT || 3001;
const app = express();

morgan.token("body", function (req, res){
    return JSON.stringify(req.body);
});

//Middleware-function that will run before our routes
// after we create the express app we call it again but instead of creating a get, post, etc. handler we are going to use the Use-method  
// Use-Method - it will run the functons that we put inside it before any routes
// we tell exp app dapat you need to know how read json data, we are making the server understand json

app.use(cors());
app.use(express.json());

// app.use(morgan("tiny"));
// app.use(morgan("short"));
// app.use(morgan("dev"));
// app.use(morgan("common"));
// app.use(morgan("combined"));

// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(morgan(':method :url :status :body'));

//morgan is a logger

// app.use(logger);

//same origin 

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
    },
    {
        id:4, 
        content: "ExressJS is awsome!",
        important: false,
    }

]

// HTTP Methods: GET, POST, DELETE, PUT, PATCH
// RESTful API - convention to creating your api endpoint
/*
URL         verb        functionality
notes       GET         fetches all resources in the collection
notes/10    GET         fetching a single resource in a collection
notes       POST        creates a new resource based on the request data  
notes/10    DELETE      remove the identified resource
notes/10    PUT         replaces the entire identified resource
notes/10    PATCH       replaces part of the identified resource
*/

// function logger(req, res, next){
//     console.log(`Method: ${req.method}`);
//     console.log(`Method: ${req.path}`);                                      
//     console.log(`Method: ${JSON.stringify(req.body)}`);
//     console.log("----------------------");
//     next();
// }

function unknownEndpoint(req, res){
    res.status(404).send({error: "unkonwn endpoint"});
}

function generateId(){
    const maxId =  notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0;
    return maxId + 1;
}

app.get("/", (request, response) => {
    response.send("<h1>Hello from ExpressJS!</h1>")
});

app.get("/notes/info", (req, res) => {
    const notesCount = notes.length;
    
        return res.send(`<p> Notes app has ${notesCount} notes</p>`);
    });

app.get("/notes", (request, response) => {
    response.json(notes);
});

app.get("/notes/:id", (request, response) => {
    const id = Number(request.params.id);
    const note = notes.find((note) => note.id === id);

    response.json(note);
});

app.delete("/notes/:id", (req, res) => {
    const id = Number(req.params.id);
    notes = notes.filter((note) => note.id !== id);

    res.status(204).end();
});

app.post("/notes", (req, res) => {
    const body = req.body;

    if(!body.content){
        return res.status(400).json({error: "content missing"});
    }
  
    const note = {
        content: body.content,
        important: body.important || false,
        id: generateId(),
    } 

    // const maxId =  notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0;
    // const note = req.body;
    // note.id = maxId + 1;


    // console.log(note);
    //the data can be found in body
    notes = notes.concat(note);
    return res.status(201).json(note)
// return would stop the running of the code until the return and not run the other data

});

app.use(unknownEndpoint);


app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}`)
});
