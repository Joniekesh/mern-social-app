const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		desc: {
			type: String,
			required: true,
		},
		photo: {
			type: String,
			default: "",
		},
		likes: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
				},
				name: {
					type: String,
				},
				profilePic: {
					type: String,
				},
				followers: {
					type: Array,
				},
				followings: {
					type: Array,
				},
			},
		],
		comments: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
				},
				name: {
					type: String,
				},
				profilePic: {
					type: String,
				},
				followers: {
					type: Array,
				},
				followings: {
					type: Array,
				},
				desc: {
					type: String,
					required: true,
				},
				likes: [
					{
						user: {
							type: mongoose.Schema.Types.ObjectId,
							ref: "User",
						},
						name: {
							type: String,
						},
						profilePic: {
							type: String,
						},
						followers: {
							type: Array,
						},
						followings: {
							type: Array,
						},
					},
				],
				replies: [
					{
						user: {
							type: mongoose.Schema.Types.ObjectId,
							ref: "User",
						},
						name: {
							type: String,
						},
						profilePic: {
							type: String,
						},
						followers: {
							type: Array,
						},
						followings: {
							type: Array,
						},
						desc: {
							type: String,
						},
						likes: [
							{
								user: {
									type: mongoose.Schema.Types.ObjectId,
									ref: "User",
								},
								name: {
									type: String,
								},
								profilePic: {
									type: String,
								},
								followers: {
									type: Array,
								},
								followings: {
									type: Array,
								},
							},
						],
						date: {
							type: Date,
							default: Date.now,
						},
					},
				],
				date: {
					type: Date,
					default: Date.now,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Post", PostSchema);
