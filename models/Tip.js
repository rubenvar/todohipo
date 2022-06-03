const mongoose = require('mongoose');

const { Schema } = mongoose;

const tipSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: 'Supply a title for this tip',
    },
    desc: {
      type: String,
      trim: true,
    },
    created: {
      type: Date,
      default: Date.now,
    },
    votes: {
      voteNum: {
        type: Number,
        default: 0,
      },
      total: {
        type: Number,
        default: 0,
      },
    },
    category: {
      type: String,
      trim: true,
      required: 'Supply a category',
    },
    ips: [
      {
        type: String,
      },
    ],
    clicks: {
      type: Number,
      default: 0,
    },
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

// Set a virtual field 'votes.avg' with the average
tipSchema.virtual('votes.avg').get(function () {
  let avg = Math.round((this.votes.total / this.votes.voteNum) * 10) / 10;
  if (!avg) {
    avg = 0;
  }
  return avg;
});

module.exports = mongoose.model('Tip', tipSchema);
