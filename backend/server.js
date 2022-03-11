const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const profileRoutes = require("./routes/profiles");
const postRoutes = require("./routes/posts");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

// API
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || PORT;

app.listen(PORT, () =>
	console.log(`SERVER runnning in ${process.env.NODE_ENV} MODE on PORT ${PORT}`)
);
