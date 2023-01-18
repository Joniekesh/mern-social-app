const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		company: {
			type: String,
		},
		location: {
			type: String,
		},
		website: {
			type: String,
		},
		skills: {
			type: [String],
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
		headline: {
			type: String,
		},
		bio: {
			type: String,
		},
		githubusername: {
			type: String,
		},
		experience: [
			{
				title: {
					type: String,
					required: true,
				},
				company: {
					type: String,
					required: true,
				},
				location: {
					type: String,
				},
				from: {
					type: Date,
					required: true,
				},
				to: {
					type: Date,
				},
				current: {
					type: Boolean,
					default: false,
				},
				description: {
					type: String,
				},
			},
		],
		education: [
			{
				school: {
					type: String,
					required: true,
				},
				degree: {
					type: String,
					required: true,
				},
				fieldofstudy: {
					type: String,
					required: true,
				},
				from: {
					type: Date,
					required: true,
				},
				to: {
					type: Date,
				},
				current: {
					type: Boolean,
					default: false,
				},
				description: {
					type: String,
				},
			},
		],
		social: {
			youtube: {
				type: String,
			},
			instagram: {
				type: String,
			},
			linkedin: {
				type: String,
			},
			facebook: {
				type: String,
			},
			twitter: {
				type: String,
			},
		},
	},
	{
		timestamps: true,
	}
);

module.exports = Profile = mongoose.model("Profile", ProfileSchema);
