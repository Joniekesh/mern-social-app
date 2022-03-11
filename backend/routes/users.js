const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const protect = require("../middleware/authMiddleware");
const User = require("../models/User");

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
		if (err.kind == "ObjectId") {
			return res.status(404).json({ msg: "User not found" });
		}
		res.status(500).send("Server Error");
	}
});

// @desc   Get all users
// @route  GET /api/users
// @access Public
router.get("/", async (req, res) => {
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
router.get("/:id", async (req, res) => {
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

// @desc   Follow/Unfollow a user
// @route  PUT /api/users/:id/follow
// @access Private
router.put("/:id/follow", protect, async (req, res) => {
	if (req.user.id.toString() !== req.params.id) {
		try {
			const user = await User.findById(req.params.id);
			const currentUser = await User.findById(req.user.id);

			if (!user.followers.includes(req.user.id)) {
				await user.updateOne({ $push: { followers: req.user.id } });
				await currentUser.updateOne({ $push: { followings: req.params.id } });

				res.status(200).json({ msg: "User has been followed" });
			} else {
				await user.updateOne({ $pull: { followers: req.user.id } });
				await currentUser.updateOne({ $pull: { followings: req.params.id } });

				res.status(200).json({ msg: "User has been unfollowed" });
			}
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	} else {
		res.status(400).json({ msg: "You cannot follow/unfollow yourself" });
	}
});

// @desc   Get all friends
// @route  GET /api/friends
// @acess  Private
router.get("/friends/all", protect, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		const friends = await Promise.all(
			user.followings.map((friendId) => {
				return User.findById(friendId);
			})
		);

		let friendList = [];

		friends.map((friend) => {
			const { _id, name, profilePic } = friend;

			friendList.push({ _id, name, profilePic });
		});

		res.status(200).json(friendList);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @desc   Delete user
// @route  DELETE /api/users
// @access Private
router.delete("/", protect, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		if (!user) {
			return res.status(404).json({ msg: "User not found" });
		}

		await user.remove();

		res.json({ msg: "User Removed" });
	} catch (err) {
		console.error(err.message);
		if (err.kind == "ObjectId") {
			res.status(400).json({ msg: "User was not removed" });
		}
		res.status(500).send("Server Error");
	}
});

module.exports = router;
