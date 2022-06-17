var express = require("express");
const User = require("../models/User");
var router = express.Router();
const handleNewUser = require("../controllers/UserController");

router.get("/api/get", async (req, res, next) => {
	const posts = await User.find();
	res.send(posts);
});

router.post("/register", async (req, res, next) => {
	handleNewUser(req, res);
});

module.exports = router;
