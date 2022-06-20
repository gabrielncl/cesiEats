var express = require("express");
const User = require("../models/User");
var router = express.Router();
const {
	handleNewUser,
	handleLogin,
	deleteUser,
} = require("../controllers/UserController");

router.get("/api/get", async (req, res, next) => {
	const posts = await User.find();
	res.send(posts);
});

router.post("/login", async (req, res, next) => {
	handleLogin(req, res);
});

router.post("/register", async (req, res, next) => {
	handleNewUser(req, res);
});

router.delete("/delete/:id", async (req, res, next) => {
	deleteUser(req, res);
});

module.exports = router;
