const router = require('express').Router();
const mongoose = require('mongoose');
const Users = require('../../models/user')
const  Thoughts = require('../../models/thoughts')

router.get('/', async (req, res) => {
  console.log("In get users")
  try {
    const allUsers = await Users.find({});
    return res.status(200).json(allUsers)
  } catch (error) {
    console.error(error)
    return res.status(500).json({message: "Internal Server Error"})
  }
})

router.post('/newUser', async (req, res) => {
  try {
    let newUser = Users.create(req.body);
    res.status(201).json(newUser)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/update/:id', async (req, res) => {
  const userId = req.params.id;
  const updateData = req.body; // {"username": "Tesfdst", "email": "Tedfsst@email.com"}

  try {
      const currentUser = await Users.findOne({_id: userId});
      const updatedUser = await Users.findByIdAndUpdate(userId, updateData, { new: true });

      if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
      }

      await Thoughts.updateMany({ username: currentUser.username }, { username: updateData.username }); //{$set: { username: updateData.username }}

      res.status(200).json(updatedUser);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const user = await Users.findByIdAndDelete({_id: req.params.id})

    if (!user) {
      return res.status(404).json({message: 'No user with that ID'})
    }
    await Thoughts.deleteMany({_id: { $in: user.thoughts }})
    res.json({ message: "User and associated thoughts"})
  } catch (err) {
    res.status(500).json(err)
  }
})


module.exports = router;