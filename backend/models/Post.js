const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
		},
		name: {
			type: String,
		},
		profilePic: {
			type: String,
			default: "",
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
				},
				name: {
					type: String,
				},
				profilePic: {
					type: String,
					default: "",
				},
			},
		],
		comments: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
				},
				name: {
					type: String,
					required: true,
				},
				profilePic: {
					type: String,
					default: "",
				},
				desc: {
					type: String,
					required: true,
				},
				likes: [
					{
						user: {
							type: mongoose.Schema.Types.ObjectId,
						},
						name: {
							type: String,
						},
						profilePic: {
							type: String,
							default: "",
						},
					},
				],
				replies: [
					{
						user: {
							type: mongoose.Schema.Types.ObjectId,
						},
						name: {
							type: String,
						},
						profilePic: {
							type: String,
							default: "",
						},
						desc: {
							type: String,
						},
						likes: [
							{
								user: {
									type: mongoose.Schema.Types.ObjectId,
								},
								name: {
									type: String,
								},
								profilePic: {
									type: String,
									defualt: "",
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
