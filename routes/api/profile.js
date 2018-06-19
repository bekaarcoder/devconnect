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

module.exports = router;