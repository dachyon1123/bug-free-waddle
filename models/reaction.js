const mongoose = require('mongoose')
const { Schema, Types } = require('mongoose');
const moment = require('moment')

function formatDate(date) {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
}


const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate
    }
  }, {
    toJSON: { getters: true }, 
    toObject: { getters: true } 
});

// const ReactionModel = mongoose.model('Reaction', reactionSchema);

module.exports = reactionSchema;