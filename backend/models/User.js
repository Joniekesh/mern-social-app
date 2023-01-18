const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		profilePic: {
			type: String,
			default:
				"http://res.cloudinary.com/joniekesh/image/upload/v1657122047/upload/qw8fkm9pirbdlmyeeefp.jpg",
		},
		coverPhoto: {
			type: String,
			default:
				"http://res.cloudinary.com/joniekesh/image/upload/v1657122319/upload/ee3daenqi9pxkglho8se.webp",
		},
		followers: [
			{
				user: {
					type: String,
				},
				name: {
					type: String,
				},
				profilePic: {
					type: String,
				},
			},
		],
		followings: [
			{
				user: {
					type: String,
				},
				name: {
					type: String,
				},
				profilePic: {
					type: String,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);

	next();
});
module.exports = User = mongoose.model("User", UserSchema);
