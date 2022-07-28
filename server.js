// import node module express
const express = require('express');

// import webroutes and apiroutes
const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');

// set up server for heroku and local machine
const PORT = process.env.PORT || 3001;

// create app instance
const app = express();

// serve static middleware
app.use(express.static('public'));
// so express can understand incoming json and form data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// load web routes
app.use(webRoutes);
// load api routes, all endpoints have prefix of api so can attach in globally here
app.use('/api', apiRoutes);

// wildcard sends 404 error
app.get('*', (req, res) => {
    res.status(404).send('The page you are looking for is not found');
})

// listen to the port
app.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}`);
})