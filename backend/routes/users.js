const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const protect = require("../middleware/authMiddleware");
const User = require("../models/User");
const Profile = require("../models/Profile");
const Post = require("../models/Post");

// @desc   Update user
// @route  PUT /api/users
// @access Private
router.put("/me", protect, async (req, res) => {
	const { name, email, password, profilePic, coverPhoto } = req.body;
	try {
		const user = await User.findById(req.user.id);

		if (!user) {
			return res.status(404).json({ msg: "User not found" });
		}

		user.name = name || user.name;
		user.email = email || user.email;
		user.profilePic = profilePic || user.profilePic;
		user.coverPhoto = coverPhoto || user.coverPhoto;
		if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedUser = await user.save();

		res.json(updatedUser);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @desc   Get all users
// @route  GET /api/users
// @access Private
router.get("/", protect, async (req, res) => {
	try {
		const users = await User.find().select("-password");

		res.json(users);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @desc   Get a user by ID
// @route  GET /api/users
// @access Public
router.get("/:id", protect, async (req, res) => {
	try {
		const user = await User.findById(req.params.id).select("-password");

		if (!user) {
			return res.status(404).json({ msg: "User not found" });
		}

		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @desc   Follow a user
// @route  PUT /api/users/:id/follow
// @access Private
router.put("/:id/follow", protect, async (req, res) => {
	if (req.user.id.toString() !== req.params.id) {
		try {
			const user = await User.findById(req.params.id);
			const currentUser = await User.findById(req.user.id);

			if (
				!user.followers.some(
					(follower) => follower.user.toString() === req.user.id
				)
			) {
				await user.updateOne({
					$push: {
						followers: {
							user: req.user._id,
							name: req.user.name,
							profilePic: req.user.profilePic,
						},
					},
				});
				await currentUser.updateOne({
					$push: {
						followings: {
							user: req.params.id,
							name: user.name,
							profilePic: user.profilePic,
						},
					},
				});

				res.status(200).json({ msg: "You are now following this user" });
			} else {
				res.status(400).json({ msg: "You already follow this user" });
			}
		} catch (err) {
			console.error(err.message);
			if (err.kind == "ObjectId") {
				return res.status(400).json({ msg: "Error with follow user" });
			}
			res.status(500).send("Server Error");
		}
	} else {
		res.status(400).json({ msg: "You cannot follow yourself" });
	}
});

// @desc   Unfollow a user
// @route  PUT /api/users/:id/follow
// @access Private
router.put("/:id/unfollow", protect, async (req, res) => {
	if (req.user.id.toString() !== req.params.id) {
		try {
			const user = await User.findById(req.params.id);
			const currentUser = await User.findById(req.user.id);

			if (
				user.followers.some(
					(follower) => follower.user.toString() === req.user.id
				)
			) {
				await user.updateOne({
					$pull: { followers: { user: req.user.id } },
				});
				await currentUser.updateOne({
					$pull: { followings: { user: req.params.id } },
				});

				res.status(200).json({ msg: "You are now unfollowing this user" });
			} else {
				res.status(400).json({ msg: "You do not follow this user yet" });
			}
		} catch (err) {
			console.error(err.message);
			if (err.kind == "ObjectId") {
				return res.status(400).json({ msg: "Error with unfollow user" });
			}
			res.status(500).send("Server Error");
		}
	} else {
		res.status(400).json({ msg: "You cannot unfollow yourself" });
	}
});

// @desc   Get random user
// @route  GET /api/users/random
// @access Private
router.get("/find/random", protect, async (req, res) => {
	try {
		const users = await User.aggregate([{ $sample: { size: 3 } }]);
		res.status(200).json(users);
	} catch (err) {
		console.log(err);
		res.status(500).send("Server Error");
	}
});

// @desc   Get all friends
// @route  GET /api/users/:id/friends/all
// @acess  Private
// router.get("/friends/:id/all", protect, async (req, res) => {
// 	try {
// 		const user = await User.findById(req.params.id);
// 		const friends = await Promise.all(
// 			user.followings.map((friendId) => {
// 				return User.findById(friendId.user);
// 			})
// 		);

// 		let friendList = [];

// 		friends.map((friend) => {
// 			const { _id, name, profilePic, followers, followings } = friend;

// 			friendList.push({ _id, name, profilePic, followers, followings });
// 		});

// 		res.status(200).json(friendList);
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send("Server Error");
// 	}
// });

module.exports = router;
