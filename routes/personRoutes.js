const express = require("express");
const router = express.Router();
const Person = require('./../models/Person');
const {jwtAuthMiddleware} = require('./../jwt');

// POST route to add a person
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json({response: response});
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "interanl server error" });
  }
});

// GET methos to get the person
router.get('/', jwtAuthMiddleware,async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "interanl server error" });
  }
});

router.get('/:workType',  async (req, res) => {
  try {
    const workType = req.params.workType; // Extract the work type from the URL parameter
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("responce fatched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalie work type" });
    }
  } catch {
    console.log(err);
    res.status(500).json({error: "interanl server error" });
  }
});

router.put('/:id', async (req, res) => {
    try{
        const personId = req.params.id; // Extract the id from the URL parameter
        const updatePersonData = req.body; //Update data for the person
        
        const response = await Person.findByIdAndUpdate(personId, updatePersonData, {
            new: true, //Return the updated document
            runValidators: true // Run Mongoose validation
        });
        if(!response) {
            return res.status(404).json({error: 'Person not found'});
        }
        console.log('data updated');
        res.status(200).json(response);
    } catch {
        console.log(err);
        res.status(500).json({ err: "interanl server error" });
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const personId = req.params.id; // Extract the id from the URL parameter
        const deletePersonData = req.body; //Update data for the person
        
        const response = await Person.findOneAndDelete(personId, deletePersonData);
        if(!response) {
            return res.status(404).json({error: 'Person not found'});
        }
        console.log('data deleted');
        res.status(200).json({message: 'person deleted successfully'});
    } catch(err) {
        console.log(err);
        res.status(500).json({error: "interanl server error" });
    }
});

module.exports = router;
