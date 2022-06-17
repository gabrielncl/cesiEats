var express = require("express");
const Developer = require("../models/Developer");
var router = express.Router();
const handleNewDeveloper = require("../controllers/DeveloperController");

router.get("/api/get", async (req, res, next) => {
	const posts = await Developer.find();
	res.send(posts);
});

router.post("/register", async (req, res, next) => {
	handleNewDeveloper(req, res);
});

module.exports = router;
