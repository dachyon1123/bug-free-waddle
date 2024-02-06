const mongoose = require('mongoose');
const Thoughts = require('../models/thoughts'); // Replace with the actual path to your Thoughts model
const moment = require('moment'); // For date formatting

mongoose.connect('mongodb://localhost:27017/socialDB');

const seedThoughts = async () => {
    // Clear the existing thoughts
    await Thoughts.deleteMany({});

    // Seed data array
    const thoughtsData = [
        {
            thoughtText: 'First thought text',
            createdAt: new Date(), 
            username: 'user1',
            reactions: [
                {
                    
                    reactionId: new mongoose.Types.ObjectId(),
                    reactionBody: 'First reaction to first thought',
                    username: 'user2',
                    createdAt: new Date() 
                }
                
            ]
        },
        {
            thoughtText: 'Second thought text',
            createdAt: new Date(), 
            username: 'user2',
            reactions: [
                {
                    
                    reactionId: new mongoose.Types.ObjectId(),
                    reactionBody: 'First reaction to second thought',
                    username: 'user1',
                    createdAt: new Date() 
                }
                
            ]
        }
        
    ];

    
    await Thoughts.insertMany(thoughtsData);
    console.log('Thoughts seeded successfully');
};

seedThoughts().then(() => {
    mongoose.connection.close();
});
