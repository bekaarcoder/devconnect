const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const validateProfileInput = require('../../validations/profile');
const validateExperienceInput = require('../../validations/experience');
const validateEducationInput = require('../../validations/education');

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

// @router 	POST api/profile/experience
// @desc 		Add experience to profile
// @access 	Private
router.post('/experience', passport.authenticate('jwt', {session: false}), (req, res) => {
	const {errors, isValid} = validateExperienceInput(req.body);
	// check validation
	if(!isValid) {
		return res.status(400).json(errors);
	}

	Profile.findOne({user: req.user.id})
		.then(profile => {
			if(profile){
				const newExp = {
					title: req.body.title,
					company: req.body.company,
					location: req.body.location,
					from: req.body.from,
					to: req.body.to,
					current: req.body.current,
					description: req.body.description,
				};
				// add to experience array
				profile.experience.unshift(newExp);
				profile.save().then((profile) => res.json(profile));
			} else {
				res.json({error: "wtf!"})
			}
		});
});

// @router 	DELETE api/profile/experience/:exp_id
// @desc 		Delete experience from profile
// @access 	Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', {session: false}), (req, res) => {
	Profile.findOne({user: req.user.id})
		.then((profile) => {
			for(let [index, exp] of profile.experience.entries()) {
				if(exp.id === req.params.exp_id) {
					var removeIndex = index;
				}
			}
			// splice out of array
			profile.experience.splice(removeIndex, 1);
			// save
			profile.save().then(profile => res.json(profile));
		}).catch(err => res.status(404).json(err));
});

// @router 	POST api/profile/education
// @desc 		Add education to profile
// @access 	Private
router.post('/education', passport.authenticate('jwt', {session: false}), (req, res) => {
	const {errors, isValid} = validateEducationInput(req.body);
	// check validation
	if(!isValid) {
		return res.status(400).json(errors);
	}

	Profile.findOne({user: req.user.id})
		.then((profile) => {
			if(profile) {
				const newEdu = {
					title: req.body.title,
					degree: req.body.degree,
					field: req.body.field,
					from: req.body.from,
					to: req.body.to,
					current: req.body.current
				};
				// add to education array
				profile.education.unshift(newEdu);
				profile.save().then((profile) => res.json(profile));
			}
		})
});

// @router 	DELETE api/profile/education/:edu_id
// @desc 		Delete education from profile
// @access 	Private
router.delete('/education/:edu_id', passport.authenticate('jwt', {session: false}), (req, res) => {
	Profile.findOne({user: req.user.id})
		.then(profile => {
			const removeIndex = profile.education
				.map(item => item.id)
				.indexOf(req.params.edu_id);
			console.log(removeIndex);

			// splice item of array
			if(removeIndex > -1) {
				profile.education.splice(removeIndex, 1);
			} else {
				return res.status(404).json({err: 'Not found'});
			}
			// save
			profile.save().then(profile => res.json(profile));
		}).catch(err => res.status(404).json(err));
});

// @router 	DELETE api/profile
// @desc 		Delete User and Profile
// @access 	Private
router.delete('/', passport.authenticate('jwt', {session: false}), (req, res) => {
	Profile.findOneAndRemove({user: req.user.id})
		.then(() => {
			User.findOneAndRemove({_id: req.user.id})
				.then(() => res.json({status: "Success"}))
				.catch((err) => res.status(400).json(err));
		}).catch((err) => res.status(400).json(err));
});

module.exports = router;