// Dependencies

const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json')

// Sets up the Express App

const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

// let notes = fs.readFile(JSON.parse('.\db\db.json'))

app.get('/api/notes', (req, res) =>{
    console.log(db)
    res.json(db);
});

app.post('/api/notes', (req, res) =>{
    db.push(req.body)
    var allNotes = db;
    // use fs to write to the db.json file the allNotes
    fs.writeFile('./db/db.json', JSON.stringify(allNotes), function(err, result){
        if (err) {
            console.log(err)
        } else {
            console.log("Wrote")
        }  
    })
})


app.delete('/api/notes', (req, res) => {
    console.log(req.body);
})


 // Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));