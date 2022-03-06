const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();
const app = express();

const PORT = process.env.PORT || PORT;

app.get("/", (req, res) => {
	res.send("API Running");
});
app.listen(PORT, () =>
	console.log(`SERVER runnning in ${process.env.NODE_ENV} MODE on PORT ${PORT}`)
);
