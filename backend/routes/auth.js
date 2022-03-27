const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const protect = require("../middleware/authMiddleware");

// @desc   Get logged in user
// @route  GET /api/auth/me
// @access Private
router.get("/me", protect, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");

		if (!user) {
			return res.status(404).json({ msg: "User not found" });
		}

		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @desc   Create user
// @route  POST /api/auth
// @access Private
router.post(
	"/",
	[
		check("name", "Name is required").notEmpty(),
		check("email", "Please include a valid email").isEmail(),
		check(
			"password",
			"A password of 6 or more characters is required"
		).isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;
		try {
			let user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({
					errors: [
						{ msg: `A user with the email address: ${email} already exist` },
					],
				});
			}

			user = new User({
				name,
				email,
				password,
			});

			await user.save();

			res.status(201).json({
				token: generateToken(user._id),
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

// @desc   Login user
// @route  POST /api/auth/login
// @access Public
router.post(
	"/login",
	[
		check("email", "Please provide a valid email").isEmail(),
		check(
			"password",
			"Please provide a password of not less than 6 characters"
		).isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (!user) {
				return res
					.status(400)
					.json({ errors: [{ msg: "Invalid credential" }] });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res
					.status(400)
					.json({ errors: [{ msg: "Invalid credential" }] });
			}

			await user.save();

			res.status(200).json({
				token: generateToken(user._id),
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

module.exports = router;
