const express = require("express");
const app = express();
const helmet = require("helmet");
const dotenv = require("dotenv");
const morgan = require("morgan");
const multer = require("multer");
const mongoose = require("mongoose");

const lectureRoute = require("./routes/lecture");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

const router = express.Router();
// const path = require("path");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
	console.log("Connected to MongoDB");
});

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// const upload = multer({ storage: storage });
// app.post("/api/upload", upload.single("file"), (req, res) => {
// 	try {
// 		return res.status(200).json("File uploded successfully");
// 	} catch (error) {
// 		console.error(error);
// 	}
// });

const storageUpload = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "../../hbnu-chatbot/websocket/pdf");
	},
	filename: (req, file, cb) => {
		cb(null, req.body.name);
	},
});

const uploadLecture = multer({ storage: storageUpload });
app.post("/api/uploadLecture", uploadLecture.single("file"), (req, res) => {
	try {
		return res.status(200).json("File uploded successfully");
	} catch (error) {
		console.error(error);
	}
});

app.use("/api/lecture", lectureRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.listen(8900, () => {
	console.log("Backend server is running!");
});
