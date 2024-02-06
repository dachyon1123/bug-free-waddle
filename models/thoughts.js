const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
const moment = require('moment');
const reactionSchema = require('./reaction')


function formatDate(date) {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
}


const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: { getters: true },
    toObject: { getters: true } 
});

const Thoughts = mongoose.model('thoughts', thoughtsSchema)

module.exports = Thoughts;