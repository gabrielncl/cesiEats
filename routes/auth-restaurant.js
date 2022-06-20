var express = require("express");
const Restaurant = require("../models/Restaurant");
var router = express.Router();
const {
	handleNewRestaurant,
	handleLogin,
	deleteRestaurant,
	updateRestaurant,
} = require("../controllers/RestaurantController");

router.get("/api/get", async (req, res, next) => {
	const posts = await Restaurant.find();
	res.send(posts);
});

router.post("/login", async (req, res, next) => {
	handleLogin(req, res);
});

router.post("/register", async (req, res, next) => {
	handleNewRestaurant(req, res);
});

router.delete("/delete/:id", async (req, res, next) => {
	deleteRestaurant(req, res);
});

router.put("/update/:id", async (req, res, next) => {
	updateRestaurant(req, res);
});

module.exports = router;
