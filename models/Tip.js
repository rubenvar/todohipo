const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise; // it's there to suppress the error even if it's added in start.js already

const tipSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: 'Supply a title for this tip'
  },
  desc: {
    type: String,
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    trim: true,
    required: 'Supply a category'
  }
});

module.exports = mongoose.model('Tip', tipSchema);