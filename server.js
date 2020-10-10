// Build server sturcture
const express = require("express");
const app = express();
const fs = require("fs");
const path = require('path');

const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


let noteData = fs.readFileSync(path.join(__dirname, "./db/db.json"), "utf8");
noteData = JSON.parse(noteData);
// Build data structures
// Array of notes 
// let noteData = [
//     {
//         title:"Test Title",
//         text:"Test text"
//     }
// ];
// ID counter
let myIndex = noteData[noteData.length - 1].id;

// Build my routes
// readME requested route for *
// app.get("*", function(req, res){
//     res.sendFile(path.join(__dirname,"./public/index.html"))
// })


// Get route for homepage
app.get("/", function (req, res) {
    // console.log(path.join(__dirname,"./public/index.html"));
    // For some reason this isn't working below
    res.sendFile(path.join(__dirname, "./public/index.html"))
})


// Get route for notes page
app.get("/notes", function (req, rest) {
    rest.sendFile(path.join(__dirname, "/public/notes.html"))
})

// Get route for notes data
app.get("/api/notes", function (req, mres) {
    mres.json(noteData);
})

// POST route to add a note
app.post("/api/notes", function (req, res) {
    console.log(req.body);
    const newNoteObj = {
        id: myIndex + 1,
        title: req.body.title,
        text: req.body.text
    }
    noteData.push(newNoteObj);
    // Need to add index functionality
    myIndex = myIndex + 1;
    fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(noteData));
    // fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(noteData, null, 2));
    res.send("added note");
})
// POST route to delete a note
app.delete("/api/notes/:id", function (req, res) {
    // For testing of the delete (works fine)
    // app.delete("/api/notes", function (req, res) {    
    // console.log(req.params)
    // const testerID = 3
    let noteCheck = true
    for (let i = 0; i < noteData.length; i++) {
        // So this is working fine, the provided
        // if(noteData[i].id===parseInt(testerID)){
        if (noteData[i].id === parseInt(req.params.id)) {
            noteData.splice(i, 1);
            fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(noteData));
            // fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(noteData, null, 2));
            notecheck = false;
            return res.send("Removed Note!")
        }
    }
    if (noteCheck) {
        return res.send("No Note Found")
    }
})


app.listen(PORT, function () {
    console.log(`listening on port ${PORT}`);
})