var express = require("express");
var router = express.Router();
const User = require("../models/User");
const Order = require("../models/Order");

const {
	handleNewUser,
	handleLogin,
	deleteUser,
	updateUser,
} = require("../controllers/UserController");

const { checkJWT, returnUserFromJwt } = require("../modules/jwt");
const { handleNewOrder } = require("../controllers/OrderController");

router.get("/profile", checkJWT, async (req, res) => {
	res.send(returnUserFromJwt(req, res));
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

router.put("/update/:id", async (req, res, next) => {
	updateUser(req, res);
});

router.post("/order/create", checkJWT, async (req, res, next) => {
	handleNewOrder(req, res);
});

// Test security middleware
router.get("/", checkJWT, async (req, res, next) => {
	const orders = await Order.find();
	res.send(users);
});

module.exports = router;
