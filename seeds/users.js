const mongoose = require('mongoose');
const Users = require('../models/user');

mongoose.connect('mongodb://localhost:27017/socialDB')

const seedUsers = async () => {
  
  await Users.deleteMany({});

  const thoughtId1 = new mongoose.Types.ObjectId();
  const thoughtId2 = new mongoose.Types.ObjectId();
  const userId1 = new mongoose.Types.ObjectId();
  const userId2 = new mongoose.Types.ObjectId();

  // Seed data array
  const usersData = [
      {
          _id: userId1,
          username: 'user1',
          email: 'user1@example.com',
          thoughts: [thoughtId1],
          friends: [userId2] 
      },
      {
          _id: userId2,
          username: 'user2',
          email: 'user2@example.com',
          thoughts: [thoughtId2],
          friends: [userId1] 
      }
      
  ];

  
  await Users.insertMany(usersData);
  console.log('Users seeded successfully');
};

seedUsers().then(() => {
  mongoose.connection.close();
});
