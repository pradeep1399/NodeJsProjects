const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const db = require('./db');
const passport = require('./auth');
const bodyparser = require('body-parser');
app.use(bodyparser.json());  // req.body

PORT = process.env.PORT || 3000;

// Middleware Function
const logrequest = (req, res, next) => {
    console.log((`[${new Date().toLocaleDateString()}] Request Made to : ${req.originalUrl}`));
    next(); // Move on to next phase
};

app.use(logrequest);

const localAuthMiddleware = passport.authenticate('local', {session: false});
app.get('/HelloWorld',localAuthMiddleware, function (req, res) {
    res.send('Hello World');
});

app.use(passport.initialize());

 // import the router files
 const personRoutes = require('./routes/personRoutes');
 const menuRoutes = require('./routes/menuRoutes');
 // Use the routers
 app.use('/person',localAuthMiddleware, personRoutes);
 app.use('/menu', menuRoutes);

app.listen(PORT, (err) => {
    if(err) console.log(err);
    console.log('Server listening on Port', PORT);
}) ;

