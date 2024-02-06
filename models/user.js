const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');




const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/.+\@.+\..+/, 'Please fill a valid email address'] // Email validation
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  }, {
    toJSON: {
        virtuals: true, // Ensure virtual fields are serialized
    },
    toObject: {
        virtuals: true
    }
  });

userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const Users = model('users', userSchema)

module.exports = Users