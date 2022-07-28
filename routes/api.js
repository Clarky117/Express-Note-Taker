// create router instance using express
const router = require('express').Router();
// import filesystem and path to read notes
const fs = require('fs');
const path = require('path');
// use uuid to create unique id's for each note
const uuid = require('uuid');

// create database path
const dbPath = path.join(__dirname, '..', 'db', 'db.json');

// create function to get notes
function getNotes(){
    // read json file using fs
    const dbContent = fs.readFileSync(dbPath, 'utf8');
    // return an empty array as a fallback or contents of dbContent as JSON
    return JSON.parse(dbContent) || [];
}

// create function to save notes
function saveNote(title, text){
    // create new note
    const newNote = {
        id: uuid.v4(),
        title,
        text,
    }
    // add new note to db.json file
    // get existing notes
    const notes = getNotes();
    // push new note to array
    notes.push(newNote);
    // save
    fs.writeFileSync(dbPath, JSON.stringify(notes), 'utf8');
    return newNote;
}

// The following API routes should be created:

// * `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
router.get('/notes', (req, res) => {
    const notes = getNotes();
    res.json(notes);
});

// * `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
router.post('/notes', (req, res) => {
    // create new notes
    const created = saveNote(req.body.title, req.body.text);
    res.json(created);
})

// ## Bonus

// You haven’t learned how to handle DELETE requests, but this application offers that functionality on the front end. As a bonus, try to add the DELETE route to the application using the following guideline:

// * `DELETE /api/notes/:id` should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

// export router
module.exports = router;