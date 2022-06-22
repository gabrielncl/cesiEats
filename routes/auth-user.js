var express = require("express");
var router = express.Router();
const User = require("../models/User");

const {
	handleNewUser,
	handleLogin,
	deleteUser,
	updateUser,
} = require("../controllers/UserController");

const { checkJWT } = require("../modules/jwt");

router.post("/login", async (req, res, next) => {
	handleLogin(req, res);
});

router.post("/register", async (req, res, next) => {
	handleNewUser(req, res);
});

router.delete("/delete/:id", async (req, res, next) => {
	deleteUser(req, res);
});

router.put("/update/:id", async (req, res, next) => {
	updateUser(req, res);
});

// Test security middleware
router.get("/", checkJWT, async (req, res, next) => {
	const users = await User.find();
	res.send(users);
});

module.exports = router;
