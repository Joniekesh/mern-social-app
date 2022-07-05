const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Post = require("../models/Post");
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");

// @desc   Create a post
// @route  POST /api/posts
// @access Private
router.post(
	"/",
	[check("desc", "Description is required").notEmpty()],
	protect,
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array });
		}

		const { desc, photo } = req.body;

		const newPost = new Post({
			user: req.user.id,
			desc,
			photo,
		});

		const createdPost = await newPost.save();

		res.json(createdPost);
	}
);

// @desc   Get all posts
// @route  GET /api/posts
// @access Private
router.get("/", protect, async (req, res) => {
	try {
		const posts = await Post.find().populate(
			"user",
			"name email profilePic followers followings"
		);

		if (!posts) {
			return res.status(404).json({ msg: "Posts not found" });
		}

		res.json(posts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @desc   Get a post by ID
// @route  GET /api/posts/:postId
// @access Private
router.get("/:postId", protect, async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId).populate(
			"user",
			"name email profilePic followers followings"
		);

		if (!post) {
			return res.status(404).json({ msg: "Post not found" });
		}

		res.json(post);
	} catch (err) {
		console.error(err.message);
		if (err.kind == "ObjectId") {
			return res.status(404).json({ msg: "Post not found" });
		}
		res.status(500).send("Server Error");
	}
});

// @desc   Update post
// @route  PUT /api/posts/:postId
// @access Private
router.put("/:postId", protect, async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);

		if (!post) {
			return res.status(404).json({ msg: "Post not found" });
		}

		if (post.user.toString() !== req.user.id) {
			return res
				.status(401)
				.json({ msg: "You are not authorized to update this post" });
		}

		post.desc = req.body.desc || post.desc;
		post.photo = req.body.photo || post.photo;

		updatedPost = await post.save();

		res.json(updatedPost);
	} catch (err) {
		console.error(err.message);
		if (err.kind == "ObjectId") {
			return res.status(404).json({ msg: "Post not found" });
		}
		res.status(500).send("Server Error");
	}
});

// @desc   Like/Unlike a post
// @route  PUT /api/posts/likes/:postId
// @access Private
router.put("/likes/:postId", protect, async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);
		const user = await User.findById(req.user.id);

		if (!post) {
			return res.status(404).json({ msg: "Post not found" });
		}

		if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
			await post.updateOne({
				$push: {
					likes: {
						user: user._id,
						name: user.name,
						profilePic: user.profilePic,
						followers: user.followers,
						followings: user.followings,
					},
				},
			});
			res.json(post.likes);
		} else {
			await post.updateOne({
				$pull: {
					likes: { user },
				},
			});
			res.json(post.likes);
		}
	} catch (err) {
		console.error(err.message);
		if (err.kind == "ObjectId") {
			return res.status(404).json({ msg: "Post not found" });
		}
		return res.status(500).send("Server Error");
	}
});

// @desc   Delete post
// @route  DELETE /api/posts/:postId
// @access Private
router.delete("/:postId", protect, async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);

		if (!post) {
			return res.status(404).json({ msg: "Post not found" });
		}

		if (post.user._id.toString() !== req.user.id) {
			return res
				.status(401)
				.json({ msg: "You are not authorized to delete this post" });
		}

		await post.remove();

		res.json("Post Deleted");
	} catch (err) {
		console.error(err.message);
		if (err.kind == "ObjectId") {
			res.status(404).json({ msg: "Post not found" });
		}
		res.status(500).send("Server Error");
	}
});
// @desc   Get Timeline posts of loggedin user
// @route  GET /api/posts/me/timeline
// @access Private
router.get("/me/timeline", protect, async (req, res) => {
	try {
		const currentUser = await User.findById(req.user.id);
		const currentUserPosts = await Post.find({ user: req.user.id }).populate(
			"user",
			"name email profilePic followers followings"
		);

		const friendsPosts = await Promise.all(
			currentUser.followings.map((friendId) => {
				return Post.find({ user: friendId.user }).populate(
					"user",
					"name email profilePic followers followings"
				);
			})
		);

		res.json(currentUserPosts.concat(...friendsPosts));
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// // @desc   Get TimelinePosts by user ID,
// // @route  GET /api/posts/timeline/:userId
// // @acess  Private
// router.get("/timeline/:userId", protect, async (req, res) => {
// 	try {
// 		const user = await User.findById(req.params.userId);
// 		const currentUserPosts = await Post.find({ user: req.user.id });

// 		if (!currentUserPosts) {
// 			return res.status(404).json({ msg: "User posts not found" });
// 		}

// 		const friendsPosts = await Promise.all(
// 			user.followings.map((friendId) => {
// 				return Post.find({ user: friendId.user }).populate(
// 					"user",
// 					"name email profilePic followers followings"
// 				);
// 			})
// 		);

// 		res.json(currentUserPosts.concat(...friendsPosts));
// 	} catch (err) {
// 		console.error(err.message);
// 		if (err.kind == "ObjectId") {
// 			return res.status(404).json({ msg: "Posts not found" });
// 		}
// 		return res.send("Server Error");
// 	}
// });

// // @desc   Get users all posts
// // @route  GET /api/posts/profile/me
// // @access Private
// router.get("/profile/me", protect, async (req, res) => {
// 	try {
// 		const posts = await Post.find({ user: req.user.id }).populate(
// 			"user",
// 			"name email profilePic followers followings"
// 		);

// 		if (!posts) {
// 			return res.status(404).json({ msg: "Post not found" });
// 		}

// 		res.json(posts);
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send("Server Error");
// 	}
// });

// @desc   Create Post Comment
// @route  POST /api/posts/comments/:postId
// @access Private
router.post(
	"/comments/:postId",
	[check("desc", "Descrition is required").notEmpty()],
	protect,
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findById(req.user.id);
			const post = await Post.findById(req.params.postId);
			if (!post) {
				return res.status(404).json({ errors: [{ msg: "Post not found" }] });
			}

			const newComment = {
				user: req.user.id,
				name: user.name,
				followers: user.followers,
				followings: user.followings,
				profilePic: user.profilePic,
				desc: req.body.desc,
			};

			post.comments.unshift(newComment);
			await post.save();

			res.json(newComment);
		} catch (err) {
			console.error(err.message);
			if (err.kind == "ObjectId") {
				return res.status(404).json({ msg: "Post not found" });
			}
			return res.status(500).send("Server Error");
		}
	}
);

// @desc   Update a comment,
// @route  PUT /api/posts/comments/:postId/:commentId
// @access Private
router.put("/comments/:postId/:commentId", protect, async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);

		if (!post) {
			return res.status(404).json({ msg: "Post not found" });
		}

		// Pull comment out of post
		const comment = post.comments.find(
			(comment) => comment._id.toString() === req.params.commentId
		);

		if (!comment) {
			return res.status(404).json({ msg: "Comment not found" });
		}

		// make sure the user updating the comment is the creator
		if (comment.user.toString() !== req.user.id) {
			return res
				.status(401)
				.json({ msg: "You are not authorized to update this comment" });
		}

		comment.desc = req.body.desc || comment.desc;

		await post.save();

		res.json(post);
	} catch (err) {
		console.error(err.message);
		if (err.kind == "ObjectId") {
			return res.status(400).json({ msg: "Error with comment update" });
		}
		res.status(500).send("Server Error");
	}
});

// @desc   Like/Unlike a comment
// @route  PUT /api/comments/posts/likes/:postId/:commentId
// @access Private
router.put("/comments/likes/:postId/:commentId", protect, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		const post = await Post.findById(req.params.postId);

		if (!post) {
			return res.status(404).json({ msg: "Post not found" });
		}

		// pull comment out of post
		comment = post.comments.find(
			(comment) => comment._id.toString() === req.params.commentId
		);

		if (!comment) {
			return res.status(404).json({ msg: "Comment not found" });
		}

		if (!comment.likes.some((like) => like.user.toString() === req.user.id)) {
			comment.likes.unshift({
				user: req.user.id,
				name: user.name,
				profilePic: user.profilePic,
				followers: user.followers,
				followings: user.followings,
			});

			await post.save();

			res.json(comment.likes);
		} else {
			comment.likes = comment.likes.filter(
				({ user }) => user.toString() !== req.user.id
			);

			await post.save();

			res.json(comment.likes);
		}
	} catch (err) {
		console.error(err.message);
		if (err.kind == "ObjectId") {
			res.status(400).json({ msg: "Error with comment like/unlike" });
		}
		res.status(500).send("Server Error");
	}
});

// @desc   Delete a comment
// @route  DELETE /api/posts/comments/:postId/:commentId
// @access Private
router.delete("/comments/:postId/:commentId", protect, async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);

		if (!post) {
			return res.status(404).json({ msg: "Post not found" });
		}

		//pull a comment out of a post
		const comment = post.comments.find(
			(comment) => comment._id.toString() === req.params.commentId
		);

		if (!comment) {
			return res.status(404).json({ msg: "Comment not found" });
		}

		if (comment.user.toString() !== req.user.id) {
			return res
				.status(401)
				.json({ msg: "You are not authorized to delete this comment" });
		}
		await comment.remove();

		await post.save();
		res.json("Comment Removed");
	} catch (err) {
		console.error(err.message);
		if (err.kind == "ObjectId") {
			res.status(400).json({ msg: "Error with comment deletion" });
		}
		res.status(500).send("Server Error");
	}
});

// @desc   Reply to a comment
// @route  POST /api/posts/comments/replies/:postId/:commentId
// @access Private
router.post(
	"/comments/replies/:postId/:commentId",
	[check("desc", "Description is required").notEmpty()],
	protect,
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const user = await User.findById(req.user.id);

			const post = await Post.findById(req.params.postId);

			if (!post) {
				return res.status(404).json({ msg: "Post not found" });
			}

			// pull a comment out of a post
			const comment = post.comments.find(
				(comment) => comment._id.toString() === req.params.commentId
			);

			if (!comment) {
				return res.status(404).json({ msg: "Comment not found" });
			}

			const newReply = {
				user: req.user.id,
				name: user.name,
				profilePic: user.profilePic,
				followers: user.followers,
				followings: user.followings,
				desc: req.body.desc,
			};
			comment.replies.unshift(newReply);

			await post.save();

			res.json(post);
		} catch (err) {
			console.error(err.message);
			if (err.kind == "ObjectId") {
				res.status(400).json({ msg: "Error with comment reply" });
			}
			res.status(500).send("Server Error");
		}
	}
);

// @desc   Update Comment Reply
// @route  PUT /api/posts/comments/replies/:postId/:commentId/:replyId
// @access Private
router.put(
	"/comments/replies/:postId/:commentId/:replyId",
	protect,
	async (req, res) => {
		try {
			const post = await Post.findById(req.params.postId);

			if (!post) {
				return res.status(404).json({ msg: "Post not found" });
			}

			// pull a comment from posts
			const comment = post.comments.find(
				(comment) => comment._id.toString() === req.params.commentId
			);

			if (!comment) {
				return res.status(404).json({ msg: "Comment nor found" });
			}
			// pull a reply from comments
			const reply = comment.replies.find(
				(reply) => reply._id.toString() === req.params.replyId
			);

			if (reply.user.toString() !== req.user.id) {
				return res
					.status(401)
					.json({ msg: "You are not authorized to update this reply" });
			}

			reply.desc = req.body.desc || reply.desc;

			await post.save();

			res.json(post);
		} catch (err) {
			console.error(err.message);
			if (err.kind == "ObjectId") {
				res.status(400).json({ msg: "Error with comment reply update" });
			}
			res.status(500).send("Server Error");
		}
	}
);

// @desc   Like/Unlike Comment Reply
// @route  PUT /api/posts/comments/replies/likes/:postId/:commentId/:replyId
// @access Private
router.put(
	"/comments/replies/likes/:postId/:commentId/:replyId",
	protect,
	async (req, res) => {
		try {
			const post = await Post.findById(req.params.postId);
			const user = await User.findById(req.user.id);

			if (!post) {
				return res.status(404).json({ msg: "Post not found" });
			}

			//pull comment from post
			const comment = post.comments.find(
				(comment) => comment._id.toString() === req.params.commentId
			);

			if (!comment) {
				return res.status(404).json({ msg: "Comment not found" });
			}

			const reply = comment.replies.find(
				(reply) => reply._id.toString() === req.params.replyId
			);

			if (!reply) {
				return res.status(404).json({ msg: "Reply not foun" });
			}

			if (!reply.likes.some((like) => like.user.toString() === req.user.id)) {
				reply.likes.unshift({
					user: req.user.id,
					name: user.name,
					profilePic: user.profilePic,
					followers: user.followers,
					followings: user.followings,
				});
				await post.save();

				res.json(reply.likes);
			} else {
				reply.likes = reply.likes.filter(
					({ user }) => user.toString() !== req.user.id
				);

				await post.save();

				res.json(reply.likes);
			}
		} catch (err) {
			console.error(err.message);
			if (err.kind == "ObjectId") {
				res.status(400).json({ msg: "Error with reply like/unlike" });
			}
			res.status(500).send("Server Error");
		}
	}
);

// @desc   Delete a Comment Reply
// @route  DELETE /api/posts/comments/replies/:postId/:commentId/:replyId
// @access Private
router.delete(
	"/comments/replies/:postId/:commentId/:replyId",
	protect,
	async (req, res) => {
		try {
			const user = await User.findById(req.user.id);
			const post = await Post.findById(req.params.postId);

			if (!post) {
				return res.status(404).json({ msg: "Post not found" });
			}

			const comment = post.comments.find(
				(comment) => comment._id.toString() === req.params.commentId
			);

			if (!comment) {
				return res.status(404).json({ msg: "Comment not found" });
			}

			const reply = comment.replies.find(
				(reply) => reply._id.toString() === req.params.replyId
			);

			if (!reply) {
				return res.status(404).json({ msg: "Reply not found" });
			}

			if (reply.user.toString() !== req.user.id) {
				return res
					.status(401)
					.json({ msg: "You are not authorized to delete this reply" });
			}

			await reply.remove();
			await post.save();

			res.json("Reply Removed");
		} catch (err) {
			console.error(err.message);
			if (err.kind == "ObjectId") {
				res.status(400).json({ msg: "Error with reply deletion" });
			}
			res.status(500).send("Server Error");
		}
	}
);

module.exports = router;
