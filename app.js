const cors = require("cors");
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const dbUsers = require("./db/users.js");
const dbReminders = require("./db/reminders.js");

const notesRouter = require("./routers/notes-router.js");
const usersRouter = require("./routers/users-router.js");
const remindersRouter = require("./routers/reminders-router.js");



// Creating a port variable to listen on later
const port = 3000;

let currentUser = null;


app.use(cors());
app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/notes', notesRouter);
app.use('/users', usersRouter);
app.use('/reminders', remindersRouter);

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

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, './static/index.html'));
});

app.listen(port, () => console.log("Server is listening on port " + port));