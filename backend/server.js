const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const morgan = require("morgan");
const { connectDB } = require("./utils/db");
const userroutes = require("./routes/userRoutes");
const chatroutes = require("./routes/chatRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan("dev"));


// Routes
app.use("/api", userroutes);
app.use("/api", chatroutes);

// Connect to MongoDB and start the server
connectDB().then(() => {
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
}).catch((error) => {
	console.error(`Failed to connect to MongoDB: ${error.message}`);
});
