const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile Model
const Profile = require('../../models/Profile');

// Load User Model
const User = require('../../models/Users');

router.get('/test', (req, res) => res.json({
	msg: "Profile Works"
}));

// @router 	GET api/profile
// @desc 		Get current user profile
// @access 	Private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
	const errors = {};
	Profile.findOne({user: req.user.id})
		.then((profile) => {
			if(!profile) {
				errors.msg = "No Profile Found";
				return res.status(400).json(errors);
			}
			res.json(profile);
		}).catch((err) => {
			res.status(400).json(err);
		});
});

// @router 	POST api/profile
// @desc 		Create or edit user profile
// @access 	Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
	const errors = {};
	const profileFields = {};
	profileFields.user = req.user.id;
	req.body.handle && profileFields.handle = req.body.handle;
	req.body.company && profileFields.company = req.body.company;
	req.body.website && profileFields.website = req.body.website;
	req.body.location && profileFields.location = req.body.location;
	req.body.status && profileFields.status = req.body.status;
	req.body.bio && profileFields.bio = req.body.bio;
	req.body.github && profileFields.github = req.body.github;
	// skills
	if(typeof req.body.skills !== undefined) {
		profileFields.skills = req.body.skills.split(',');
	}
	// social media links
	profileFields.social = {};
	req.body.facebook && profileFields.social.facebook = req.body.facebook;
	req.body.twitter && profileFields.social.twitter = req.body.twitter;
	req.body.linkedin && profileFields.social.linkedin = req.body.linkedin;
	req.body.instagram && profileFields.social.instagram = req.body.instagram;

	Profile.findOne({user: req.user.id})
		.then((profile) => {
			if(profile) {
				// Update Profile
				Profile.findOneAndUpdate(
					{user: req.user.id},
					{$set: profileFields},
					{new: true}
				).then((profile) => res.json(profile));
			} else {
				// Create Profile
				// check if handle exist
				Profile.findOne({handle: profileFields.handle})
					.then((profile) => {
						if(profile) {
							errors.handle = "Handle already exist";
							return res.status(400).json(errors);
						}
						// Save Profile
						const newProfile = new Profile(profileFields);
						newProfile.save().then((profile) => res.json(profile));
					});
			}
		});
});

module.exports = router;