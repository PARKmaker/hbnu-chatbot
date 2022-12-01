const Lecture = require("../models/Lecture");
const router = require("express").Router();

//create a post
router.post("/", async (req, res) => {
	const newLecture = new Lecture(req.body);
	try {
		console.log(newLecture);
		const savedLecture = await newLecture.save();
		res.status(200).json(savedLecture);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/timeline", async (req, res) => {
	try {
		const lectures = await Lecture.find();
		res.status(200).json(lectures);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/:title", async (req, res) => {
	try {
		const lecture = await Lecture.findOne({
			title: req.params.title,
		});
		res.status(200).json(lecture);
	} catch (err) {
		res.status(500).json(err);
	}
});
module.exports = router;
