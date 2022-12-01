const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema(
	{
		fileName: {
			type: String,
		},
		videoUrl: {
			type: String,
			max: 500,
		},
		title: {
			type: String,
		},
		description: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Lecture", LectureSchema);
