// Import packages
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const cws = process.cwd();

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`)
    })
});