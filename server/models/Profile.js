const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, //to store image url
    required: true,
  },
  availability: {
    type: [{ date: Date, time: String }],
    required: true,
  },
  rating: {
    type: { Number, default: 0 },
    max: 5,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rate: {
    type: String,
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = Profile = mongoose.model('profile', profileSchema);
