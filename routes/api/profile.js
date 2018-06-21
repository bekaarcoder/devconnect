const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const validateProfileInput = require('../../validations/profile');

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
		.populate('user', ['name', 'avatar'])
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

// @router 	GET api/profile/handle/:handle
// @desc 		Get profileby handle 
// @access 	Public
router.get('/handle/:handle', (req, res) => {
	const errors = {};
	Profile.findOne({handle: req.params.handle})
		.populate('user', ['name', 'avatar'])
		.then((profile) => {
			if(!profile) {
				errors.noProfile = "No Profile found";
				res.status(404).json(errors);
			}
			res.json(profile);
		}).catch((err) => {
			res.status(400).json(err);
		});
});

// @router 	GET api/user/:user_id
// @desc 		Get profile by user_id 
// @access 	Public
router.get('/user/:user_id', (req, res) => {
	const errors = {};
	Profile.findOne({user: req.params.user_id})
		.populate('user', ['name', 'avatar'])
		.then((profile) => {
			if(!profile) {
				errors.noProfile = "No Profile found";
				res.status(404).json(errors);
			}
			res.json(profile);
		}).catch((err) => {
			res.status(400).json(err);
		});
});

// @router 	GET api/profile/all
// @desc 		Get all the profiles
// @access 	Public
router.get('/all', (req, res) => {
	Profile.find().populate('user', ['name', 'avatar'])
		.then((profiles) => {
			if(!profiles) {
				errors.profiles = "There are no profiles found";
				res.status(404).json(errors);
			}
			res.json(profiles);
		}).catch((err) => res.status({profiles: "There are no profiles"}));
});

// @router 	POST api/profile
// @desc 		Create or edit user profile
// @access 	Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
	const {errors, isValid} = validateProfileInput(req.body);
	// check validation
	if(!isValid) {
		return res.status(400).json(errors);
	}

	const profileFields = {};
	profileFields.user = req.user.id;
	if(req.body.handle) profileFields.handle = req.body.handle;
	if(req.body.company) profileFields.company = req.body.company;
	if(req.body.website) profileFields.website = req.body.website;
	if(req.body.location) profileFields.location = req.body.location;
	if(req.body.status) profileFields.status = req.body.status;
	if(req.body.bio) profileFields.bio = req.body.bio;
	if(req.body.github) profileFields.github = req.body.github;
	// skills
	if(typeof req.body.skills !== undefined) {
		profileFields.skills = req.body.skills.split(',');
	}
	// social media links
	profileFields.social = {};
	if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
	if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
	if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
	if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

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