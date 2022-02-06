const User = require('../models/User');
const Profile = require('../models/Profile');
const asyncHandler = require('express-async-handler');

exports.createProfile = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    description,
    image,
    availability,
    rating,
    location,
    rate,
    user,
  } = req.body;

  const userProfileExists = await Profile.findOne({ user: user });

  if (userProfileExists) {
    res.status(400);
    throw new Error('You already have a profile you can update but not creat a new one');
  }

  const profile = await Profile.create({
    firstName,
    lastName,
    description,
    image,
    availability,
    rating,
    location,
    rate,
    user,
  });

  if (profile) {
    res.status(201).json({
      success: {
        profile: {
          id: profile._id,
          firstName: profile.firstName,
          lastName: profile.lastName,
          description: profile.description,
          image: profile.image,
          availability: profile.availability,
          rating: profile.rating,
          location: profile.location,
          rate: profile.rate,
          user: profile.user,
        },
      },
    });
  } else {
    res.status(400);
    throw new Error('Invalid profile data');
  }
});

exports.findAllProfiles = asyncHandler(async (req, res) => {
  const profiles = Profile.find({});

  if (profiles.length) {
    res.json(profiles);
  } else {
    res.status(500);
    throw new Error('No profiles found');
  }
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const profile = Profile.findById(req.params.id);
  if (profile) {
    const updatedProfile = Object.assign(profile, req.body).save();
    res.status(200);
    res.json({ message: 'Profile updated', updatedProfile });
  } else {
    res.status(500);
    throw new Error('No profile found');
  }
  exports.deleteProfile = asyncHandler(async (req, res) => {
    const profile = Profile.findById(req.params.id);
    if (profile) {
      Profile.remove({ _id: profile._id });
      res.json('Profile deleted');
    } else {
      res.status(500);
      throw new Error('No profile found');
    }
  });
});
