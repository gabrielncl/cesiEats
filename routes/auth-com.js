var express = require("express");
const Commercial = require("../models/Commercial");
var router = express.Router();

router.get("/api/get", async (req, res, next) => {
	const posts = await Commercial.find();
	res.send(posts);
});

router.post("/register", async (req, res, next) => {
	const com = new Commercial({
		email: req.body.email,
		password: req.body.password,
		refreshToken: req.body.refreshToken,
	});
	await com.save();
	res.send(com);
});

router.delete('api/:_id', function (req, res) {

  });

module.exports = router;
