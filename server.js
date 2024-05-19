const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const db = require('./db');
PORT = process.env.PORT || 3000;

app.get('/HelloWorld', function (req, res) {
    res.send('Hello World');
});

app.listen(PORT, (err) => {
    if(err) console.log(err);
    console.log('Server listening on Port', PORT);
}) ;

