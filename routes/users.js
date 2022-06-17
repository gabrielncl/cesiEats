var express = require("express");
const User = require("../models/User");
var router = express.Router();

router.get("/api/get", async (req, res, next) => {
	const posts = await User.find();
	res.send(posts);
});

router.post("/register", async (req, res, next) => {
	const user = new User({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		address: req.body.address,
		email: req.body.email,
		password: req.body.password,
		phone: req.body.phone,
		referrer: req.body.referrer,
		refreshToken: req.body.refreshToken,
	});
	await user.save();
	res.send(user);
});

module.exports = router;
