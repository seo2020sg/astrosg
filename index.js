const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/booking', (req, res) => {
    res.render('booking');
});

app.post('/submit-booking', (req, res) => {
    const { name, place, dob, time, appointmentDate } = req.body;
    // Here you would typically save this to a database
    // For now, we'll just send a success message
    res.send('Thank you for booking your consultation. We will contact you shortly to confirm your appointment.');
});

// Start server
app.listen(port, () => {
    console.log(`Astrology website running at http://localhost:${port}`);
});