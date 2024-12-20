const express = require('express');
const app = express();
const path = require('path');

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
// Set up static folder for serving CSS
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/Create', (req, res) => {
    console.log('Create get Post method');
    res.render('Create');
});
app.post('/Create', (req, res) => {
    console.log('Create Post method');
    res.render('index');
});

app.get('/Hisaab', (req, res) => {
    res.render('Hisaab');
});
app.get('/Edit', (req, res) => {
    console.log('Edit get method');
    res.render('Edit');
});
app.post('/Edit', (req, res) => {
    console.log('Edit Post method');
    res.render('index');
});
app.get('/Delete', (req, res) => {
    res.end("Deleted");
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
