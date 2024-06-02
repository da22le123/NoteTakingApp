// Requiring the http module
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const dbUsers = require("./db/users.js");
const dbNotes = require("./db/notes.js");

// Creating a port variable to listen on later
const port = 3000;

let currentUser = null;

app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post("/users", async (req, res) => {
    const results = await dbUsers.createUser(req.body);
    res.status(201).json({id: results[0]});
});

app.get("/users", async (req, res) => {
    const users = await dbUsers.getAllUsers();
    res.status(200).json({users});
});

app.get("/users/:id", async (req, res) => {
    try {
        const user = await dbUsers.getUserById(req.params.id);
        if (user) {
            res.status(200).json(user); // Return the user object directly
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

app.patch("/users/:id", async (req, res) => {
    const id = await dbUsers.updateUser(req.params.id, req.body);
    res.status(200).json({id});
});

app.delete("/users/:id", async (req, res) => {
    await dbUsers.deleteUser(req.params.id);
    res.status(200).json({success: true});
});


//returns current user, if the server was just 
//started and current user was not selected yet,
//automatically user with id: 1 is returned
app.get("/current-user", async (req, res) => {
    if (currentUser == null) {
        const defaultUser = await dbUsers.getUserById(1);
        currentUser = defaultUser[0];
    }
    res.status(200).json({currentUser});
});

//set current user
app.post("/current-user", (req, res) => {
    currentUser = req.body;
    res.status(200).json({success: true});
});

app.get("/notes/:created_by_user_id", async (req, res) => {
    console.log("/notes/:created_by_user_id accessed");
    try {
        const notes = await dbNotes.getNoteByUserId(req.params.created_by_user_id);
        if (notes) {
            res.status(200).json(notes);
        } else {
            res.status(404).json({ error: 'Notes not found' });
        }
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ error: 'Failed to fetch notes' });
    }
});

app.post("/notes", async (req, res) => {
    console.log("accessed endpoint post notes " + req.body)
    const results = await dbNotes.createNote(req.body);
    res.status(200).json({id: results[0]});
});

app.delete("/notes/:id", async (req, res) => {
    await dbNotes.deleteNote(req.params.id);
    res.status(200).json({success: true});
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, './static/index.html'));
});

app.listen(port, () => console.log("Server is listening on port " + port));