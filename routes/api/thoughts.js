const router = require('express').Router();
const mongoose = require('mongoose');
const  Thoughts = require('../../models/thoughts')

router.get('/', async (req, res) => {
  try {
    const allThoughts = await Thoughts.find({});
    return res.status(200).json(allThoughts)
  } catch (error) {
    console.error(error)
    return res.status(500).json({message: "Internal Server Error"})
  }
})

router.post('/newThought', async (req, res) => {
  try {
    let newThought = Thoughts.create(req.body);
    res.status(201).json(newThought)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/update/:id', async (req, res) => {
  const thoughtId = req.params.id;
  const updateData = req.body
  
  try {
    const updatedThought = await Thoughts.findByIdAndUpdate(thoughtId, updateData, { new: true });

      if (!updatedThought) {
          return res.status(404).json({ message: "Thought not found" });
      }
  } catch (error) {
    res.status(500).json(err);
  }

});

router.delete('/delete/:id', async (req, res) => {
  try {
    const thought = await Thoughts.findByIdAndDelete({_id: req.params.id})

    if (!thought) {
      return res.status(404).json({message: 'No thought with that ID'})
    }
    res.json({ message: "Thoughts deleted"})
  } catch (err) {
    res.status(500).json(err)
  }
})


module.exports = router;