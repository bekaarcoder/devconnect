const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile')
const validatePostInput = require('../../validations/post');

router.get('/test', (req, res) => res.json({
	msg: "Posts Works"
}));

// @route 	GET api/posts
// @desc 	  Get post
// @access  Public
router.get('/', (req, res) => {
	Post.find()
		.sort({date: -1})
		.then(posts => res.json(posts))
		.catch(err => res.status(404).json(err));
});

// @route 	GET api/posts/:post_id
// @desc 	  Get post by id
// @access  Public
router.get('/:post_id', (req, res) => {
	Post.findById(req.params.post_id)
		.then(post => res.json(post))
		.catch(err => res.status(404).json({err: "No post found"}));
});

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

// @route 	DELETE api/posts/:post_id
// @desc 	  Delete post
// @access  Private
router.delete('/:post_id', passport.authenticate('jwt', {session: false}), (req, res) => {
	/*Profile.findOne({user: req.user.id})
		.then(profile => {*/
			Post.findById(req.params.post_id)
				.then(post => {
					// check if user deleting is the post owner
					if(post.user.toString() !== req.user.id) {
						return res.status(401).json({err: "Unauthorized"});
					}
					// remove post
					post.remove().then(() => res.json({success: true}));
				}).catch(err => res.status(404).json({err: "No post found"}));
		// });
});

// @route 	POST api/posts/like/:post_id
// @desc 	  Like and unlike post
// @access  Private
router.post('/like/:post_id', passport.authenticate('jwt', {session: false}), (req, res) => {
	Post.findById(req.params.post_id)
		.then(post => {
			if(post.likes.length > 0) {
				let userHasLiked = post.likes.filter(like => like.user.toString() === req.user.id);
				if(userHasLiked.length > 0) {
					const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
					post.likes.splice(removeIndex, 1);
					// save
					post.save().then(post => res.json(post));
					return false;
				}
			}
			let userLiked = {
				user: req.user.id
			};
			post.likes.push(userLiked);
			post.save().then(post => res.json(post));
		}).catch(err => res.status(404).json({err: "Not found"}));
});

module.exports = router;