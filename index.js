// Build server sturcture
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Build data structures
    // Array of notes 
    let noteData = [
        {
            "id":0,
            "title":"Test Title",
            "text":"Test text"
        }
    ];
    // ID counter
    let index = noteData[0].id;
// TODO: Build my routes
     
// Get route for homepage
app.get("/", function(req, res){
    res.send('basic structure')
})

// Get route for notes data
app.get("/api/notes", function(req,res){
    res.json(noteData);
})

// TODO: POST route to add a note
app.post("/api/notes", function(req,res){
    console.log(req.body);
    noteData.push(req.body);
    index++;
    res.json(req.body);
})
// TODO: POST route to delete a note
// app.de("/api/notes", function(req,res){
//     res.json(noteData);
// })

app.listen(PORT, function(){
    console.log(`listening on port ${PORT}`);
})