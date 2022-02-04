const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
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
    type: [{ Date }],
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
});

module.exports = Profile = mongoose.model('profile', profileSchema);
