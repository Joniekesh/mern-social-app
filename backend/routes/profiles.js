const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const protect = require("../middleware/authMiddleware");
const Profile = require("../models/Profile");
const Post = require("../models/Post");
const User = require("../models/User");
const normalize = require("normalize-url");
const axios = require("axios");

// @desc   Get current user's profile
// @route  GET /api/profiles/me
// @access Private
router.get("/me", protect, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id }).populate(
			"user",
			"name email profilePic coverPhoto followers followings"
		);

		if (!profile) {
			return res.status(404).json({ msg: "Profile not found" });
		}

		res.status(200).json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @desc   Create/Update profile
// @route  POST /api/profiles
// @access Private
router.post(
	"/",
	[
		check("status", "Status is required").notEmpty(),
		check("skills", "Skills is required").notEmpty(),
	],
	protect,
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			website,
			skills,
			youtube,
			instagram,
			linkedin,
			facebook,
			twitter,
			...rest
		} = req.body;

		const profileFields = {
			user: req.user.id,
			website:
				website && website !== ""
					? normalize(website, { forceHttps: true })
					: "",
			skills: Array.isArray(skills)
				? skills
				: skills.split(",").map((skill) => " " + skill.trim()),
			...rest,
		};

		const socialFields = { youtube, instagram, linkedin, facebook, twitter };

		for (const [key, value] of Object.entries(socialFields)) {
			if (value && value.length > 0) {
				socialFields[key] = normalize(value, { forceHttps: true });
			}
		}

		profileFields.social = socialFields;

		try {
			let profile = await Profile.findOneAndUpdate(
				{ user: req.user.id },
				{ $set: profileFields },
				{ new: true, upsert: true, setDefaultsOnInsert: true }
			);

			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

// @desc   Get all profiles
// @route  GET /api/profiles
// @access Private
router.get("/", protect, async (req, res) => {
	try {
		const profiles = await Profile.find().populate(
			"user",
			"name email profilePic coverPhoto followers followings"
		);

		if (!profiles) {
			return res.status(404).json({ msg: "Profiles not found" });
		}

		res.json(profiles);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @desc   Get profile by user ID
// @route  GET /api/profiles/user/:user_id
// @access Public
router.get("/user/:id", protect, async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.params.id,
		}).populate(
			"user",
			"name email profilePic coverPhoto followers followings"
		);

		if (!profile) {
			return res.status(404).json({ msg: "Profile not found" });
		}

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send("Server Error");
	}
});

// @desc   Add Profile Education
// @route  POST /api/profiles/education
// @access Private
router.post(
	"/education",
	protect,
	[
		check("school", "School is required").notEmpty(),
		check("degree", "Degree is required").notEmpty(),
		check("fieldofstudy", "Field of study is required").notEmpty(),
		check(
			"from",
			"From date is required and needs to be from the past"
		).notEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const profile = await Profile.findOne({ user: req.user.id });

			profile.education.unshift(req.body);

			await profile.save();

			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

// @desc   Update Profile Education
// @route  PUT /api/profiles/education
// @access Private
router.put("/education/:eduId", protect, async (req, res) => {
	const { school, degree, fieldofstudy, from, to, current, description } =
		req.body;

	try {
		const profile = await Profile.findOne({ user: req.user.id });

		if (!profile) {
			return res.status(404).json({ msg: "Profile not found" });
		}

		if (profile.user.toString() !== req.user.id) {
			return res.status(401).json({
				msg: "You are not authorized to update this Profile Education",
			});
		}

		const edu = profile.education.find(
			(edu) => edu._id.toString() === req.params.eduId
		);

		if (edu) {
			edu.school = school || edu.school;
			edu.degree = degree || edu.degree;
			edu.fieldofstudy = fieldofstudy || edu.fieldofstudy;
			edu.from = from || edu.from;
			edu.to = to || edu.to;
			edu.current = current || edu.current;
			edu.description = description || edu.current;

			const updatedProfile = await profile.save();
			return res.json(updatedProfile);
		} else {
			res.status(404).json({ msg: "Profile not found" });
		}
	} catch (err) {
		console.error(err.message);
		if (err.kind == "ObjectId") {
			return res
				.status(400)
				.json({ msg: "Error with profile education update" });
		}
		res.status(500).send("Server Error");
	}
});

// @desc   Delete Profile Education
// @route  DELETE /api/profiles/education/:eduId
// @access Private
router.delete("/education/:eduId", protect, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });

		if (!profile) {
			return res.status(400).json({ msg: "Profile not found" });
		}

		if (profile.user.toString() !== req.user.id) {
			return res.status(401).json({
				msg: "You are not authorized to delete this Profile Education",
			});
		}

		profile.education = profile.education.filter(
			(edu) => edu._id.toString() !== req.params.eduId
		);

		await profile.save();

		res.status(200).json({ msg: "Profile education removed" });
	} catch (error) {
		console.error(err.message);
		if (err.kind == "ObjectId") {
			return res
				.status(400)
				.json({ msg: "Error with profile education deletion" });
		}
		res.status(500).send("Server Error");
	}
});

// @desc   Add Profile Experience
// @route  POST /api/profiles/experience
// @access Private
router.post(
	"/experience",
	[
		check("title", "Title is required").notEmpty(),
		check("company", "Company is required").notEmpty(),
		check("from", "From is required").notEmpty(),
	],
	protect,
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const profile = await Profile.findOne({ user: req.user.id });

			if (!profile) {
				return res.status(404).json({ msg: "Profile not found" });
			}

			profile.experience.unshift(req.body);

			await profile.save();

			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

// @desc   Update Profile Experience
// @route  PUT /api/profiles/experience/:expId
// @access Private
router.put("/experience/:expId", protect, async (req, res) => {
	const { title, company, location, from, to, current, description } = req.body;
	try {
		const profile = await Profile.findOne({ user: req.user.id });

		if (!profile) {
			return res.status(404).json({ msg: "Profile not found" });
		}

		if (profile.user.toString() !== req.user.id) {
			return res.status(401).json({
				msg: "You are not authorized to update this Profile Experience",
			});
		}

		const experience = profile.experience.find(
			(exp) => exp._id.toString() === req.params.expId
		);

		if (experience) {
			experience.title = title || experience.title;
			experience.company = company || experience.company;
			experience.location = location || experience.location;
			experience.from = from || experience.from;
			experience.to = to || experience.to;
			experience.current = current || experience.current;
			experience.description = description || experience.description;

			const updatedProfile = await profile.save();

			res.json(updatedProfile);
		} else {
			return res.status(404).json({ msg: "Experience not found" });
		}
	} catch (err) {
		console.error(err.message);
		if (err.kind == "ObjectId") {
			return res
				.status(400)
				.json({ msg: "Error with profile experience update" });
		}
		res.status(500).send("Server Error");
	}
});

// @desc   Delete Profile Experience
// @route  DELETE /api/profiles/experience/:expId
// access  Private
router.delete("/experience/:expId", protect, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });

		if (!profile) {
			return res.status(404).json({ msg: "Profile not found" });
		}

		if (profile.user.toString() !== req.user.id) {
			return res.status(401).json({
				msg: "You are not authorized to delete this Profile Experience",
			});
		}

		profile.experience = profile.experience.filter(
			(exp) => exp._id.toString() !== req.params.expId
		);

		await profile.save();

		res.json("Profile experience removed");
	} catch (err) {
		console.error(err.message);
		if (err.kind == "ObjectId") {
			return res
				.status(400)
				.json({ msg: "Error with profile experience deletion" });
		}
		res.status(500).send("Server Error");
	}
});

// @desc   Get user repositories from github
// @route  GET /api/profiles/github/:username
// @access Public
router.get("/github/:username", async (req, res) => {
	try {
		const uri = encodeURI(
			`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
		);

		const headers = {
			"user-agent": "node.js",
			Authorization: `token ${process.env.GITHUB_TOKEN}`,
		};

		const githubResponse = await axios.get(uri, { headers });

		return res.json(githubResponse.data);
	} catch (err) {
		console.error(err.message);
		return res.status(404).json({ msg: "No github profile found" });
	}
});

// @desc   Delete profile, user and posts
// @route  DELETE /api/profiles
// @access Private
router.delete("/", protect, async (req, res) => {
	try {
		await Promise.all([
			Post.deleteMany({ user: req.user.id }),
			User.findOneAndRemove({ _id: req.user.id }),
			Profile.findOneAndRemove({ user: req.user.id }),
		]);

		res.json("User Deleted");
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
