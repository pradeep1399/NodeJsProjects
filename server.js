const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const db = require('./db');
const bodyparser = require('body-parser');
app.use(bodyparser.json());  // req.body
PORT = process.env.PORT || 3000;

// const Person = require('./models/Person');
// const MenuItem = require('./models/Menu');

app.get('/HelloWorld', function (req, res) {
    res.send('Hello World');
});

/*
app.post('/person', (req, res) => {
    const data = req.body;
    
    //create a new person document using the Mongoose model
    const newPerson = new Person();
    // save a new person to the database
    newPerson.save((err, savePerson) => {
        if(err) {
            console.log(err);
            res.status(500).json({err: 'interanl server error'});
        } else {
            console.log('data saved successfully');
            res.status(200).json(savePerson);
        }
    });
 });
 */

 /*
 // POST route to add a person
 app.post('/person', async (req, res) => {
    try{
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    } catch(err) {
        console.log(err);
        res.status(500).json({err: 'interanl server error'});
    }
 });

 // GET methos to get the person
 app.get('/person', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch(err) {
        console.log(err);
        res.status(500).json({err: 'interanl server error'});
    }
    
 });

  // POST route to add a menu
  app.post('/menu', async (req, res) => {
    try{
        const data = req.body;
        const newMenu = new MenuItem(data);
        const response = await newMenu.save();
        console.log('data saved');
        res.status(200).json(response);
    } catch(err) {
        console.log(err);
        res.status(500).json({err: 'interanl server error'});
    }
 });

 // GET methos to get the menu
 app.get('/menu', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch(err) {
        console.log(err);
        res.status(500).json({err: 'interanl server error'});
    }
    
 });

 app.get('/person/:workType', async(req, res) =>{
    try{
        const workType = req.params.workType; // Extract the work type from the URL parameter
        if(workType == 'chef' || workType == 'manager'|| workType == 'waiter'){
            const response = await Person.find({work: workType});
                console.log('responce fatched');
                res.status(200).json(response);
        } else {
            res.status(404).json({error: 'Invalie work type'});
        }
    } catch {
        console.log(err);
        res.status(500).json({err: 'interanl server error'});
    }
 });
 */

 // import the router files
 const personRoutes = require('./routes/personRoutes');
 const menuRoutes = require('./routes/menuRoutes');
 // Use the routers
 app.use('/person', personRoutes);
 app.use('/menu', menuRoutes);

app.listen(PORT, (err) => {
    if(err) console.log(err);
    console.log('Server listening on Port', PORT);
}) ;

