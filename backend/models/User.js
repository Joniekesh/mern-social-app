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
			default: "",
		},
		backgroundPic: {
			type: String,
			default: "",
		},
		followers: {
			type: Array,
		},
		followings: {
			type: Array,
		},
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
