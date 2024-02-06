const mongoose = require('mongoose');
const ReactionSchema = require('../models/reaction'); // Adjust the path as needed
const moment = require('moment');

mongoose.connect('mongodb://localhost:27017/socialDB')

const seedReactions = async () => {
    const Reaction = mongoose.model('Reaction', ReactionSchema);
    await Reaction.deleteMany({});

    const reactionsData = [
        {
            reactionBody: 'Great thought!',
            username: 'user1',
            createdAt: new Date()
        },
        {
            reactionBody: 'I totally agree!',
            username: 'user2',
            createdAt: new Date()
        }
    ];

    await Reaction.insertMany(reactionsData);
    console.log('Reactions seeded successfully');
};

seedReactions().then(() => {
    mongoose.connection.close();
});
