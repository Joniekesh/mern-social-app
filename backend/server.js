const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

// API
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || PORT;

app.listen(PORT, () =>
	console.log(`SERVER runnning in ${process.env.NODE_ENV} MODE on PORT ${PORT}`)
);
