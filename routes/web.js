// create router instance using express
const router = require('express').Router();

// use path to read index.html and notes.html
const path = require('path');

// create public path to join index and notes to
const publicPath = path.join(__dirname, '..', 'public');

// * `GET /` should return the `index.html` file.
router.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// * `GET /notes` should return the `notes.html` file.
router.get('/notes', (req, res) => {
    res.sendFile(path.join(publicPath, 'notes.html'));
});

// * `GET *` should return a 404 error.



// export router
module.exports = router;