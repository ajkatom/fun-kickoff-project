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
    type: String,
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
    type: Number,
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = Profile = mongoose.model('profile', profileSchema);
