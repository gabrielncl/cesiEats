var express = require("express");
const Deliverer = require("../models/Deliverer");
var router = express.Router();
const {
	handleNewDeliverer,
	handleLogin,
	deleteDeliverer,
	updateDeliverer,
} = require("../controllers/DelivererController");

router.get("/get", async (req, res, next) => {
	const posts = await Deliverer.find();
	res.send(posts);
});

router.post("/login", async (req, res, next) => {
	handleLogin(req, res);
});

router.post("/register", async (req, res, next) => {
	handleNewDeliverer(req, res);
});

router.delete("/delete/:id", async (req, res, next) => {
	deleteDeliverer(req, res);
});

router.put("/update/:id", async (req, res, next) => {
	updateDeliverer(req, res);
});

module.exports = router;
