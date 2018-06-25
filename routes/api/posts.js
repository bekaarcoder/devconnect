const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post.js');
const validatePostInput = require('../../validations/post.js');

router.get('/test', (req, res) => res.json({
	msg: "Posts Works"
}));

// @route 	POST api/posts
// @desc 	  Create post
// @access  Private
router.post('/', passport.authenticate('jwt', {session:false}), (req, res) => {
	const {errors, isValid} = validatePostInput(req.body);
	// check validation
	if(!isValid){
		return res.status(400).json(errors);
	}

	const postFields = {
		text: req.body.text,
		name: req.body.name,
		avatar: req.body.avatar,
		user: req.user.id
	};

	const newPost = new Post(postFields);
	newPost.save().then(post => res.json(post));
});

module.exports = router;