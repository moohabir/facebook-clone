const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      require: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      unique: true,
      require: true,
      max: 50,
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
    //passwordConfirmation: {
    //type: String,
    // unique: true,
    //require: true,
    //min:6,
    //},

    profileImage: {
      type: String,
      default: '',
    },
    coverImage: {
      type: String,
      default: '',
    },
    followers: {
      type: Array,
      default: '',
    },
    following: {
      type: Array,
      default: '',
    },
    likes: {
      type: Array,
      default: '',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      max: 50,
    },
  },
  { timestamps: true }
);

const UserModal = mongoose.model('users', UserSchema);
module.exports = UserModal;
