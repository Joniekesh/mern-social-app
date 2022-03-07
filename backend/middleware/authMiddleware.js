const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.split(" ")[1];

			if (!token) {
				return res.status(400).json({ msg: "No token. Authorization denied" });
			}

			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			req.user = await User.findById(decoded.id);

			next();
		} catch (err) {
			console.error(err.message);
			res.status(400).json({ msg: "Something is wrong with fetching token" });
		}
	}
};

module.exports = protect;
