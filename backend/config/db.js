const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log(`MongoDB Connection SUCCESS ${conn.connection.host}`);
	} catch (error) {
		process.exit(1);
	}
};
module.exports = connectDB;
