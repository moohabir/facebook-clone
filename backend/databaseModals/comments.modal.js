const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  username: {
    type: String,
  },

  description: {
    type: String,
  },
  duration: {
    type: Number,
  },
  image: { type: String },
  date: {
    type: Date,

    default: new Date().toLocaleDateString(),
  },
});

const CommentModal = mongoose.model('comments', CommentSchema);
module.exports = CommentModal;
