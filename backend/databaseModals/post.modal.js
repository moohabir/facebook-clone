const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  username: {
    type: String,
  },

  description: {
    type: String,
  },
  duration: {
    type: Number,
  },
  date: {
    type: Date,

    default: new Date().toLocaleDateString(),
  },
});

const PostModal = mongoose.model('posts', PostSchema);
module.exports = PostModal;
