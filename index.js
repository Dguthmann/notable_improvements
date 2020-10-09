// Build server sturcture
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// Build data structures
    // Array of notes 
    const noteData = [];

// TODO: Build my routes
    // TODO: Get route for notes data
    // TODO: Get route for homepage
    // TODO: POST route to add a note
    // TODO: POST route to delete a note
app.get("/", function(req, res){
    res.send('basic structure')
})


app.listen(PORT, function(){
    console.log(`listening on port ${PORT}`);
})