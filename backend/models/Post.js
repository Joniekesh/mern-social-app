const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
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
		},
		title: {
			type: String,
			required: true,
		},
		desc: {
			type: String,
			required: true,
		},
		photo: {
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
