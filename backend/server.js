const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const profileRoutes = require("./routes/profiles");
const postRoutes = require("./routes/posts");
const cors = require("cors");
const path = require("path");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

// API
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/posts", postRoutes);

// if (process.env.NODE_ENV === "production") {
// 	app.use(express.static(path.join(__dirname, "../frontend/build")));

// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// 	});
// }

const PORT = process.env.PORT || PORT;

app.listen(PORT, () =>
	console.log(`SERVER runnning in ${process.env.NODE_ENV} MODE on PORT ${PORT}`)
);
