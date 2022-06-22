var express = require("express");
var router = express.Router();

const Restaurant = require("../models/Restaurant");
const {
	handleNewArticle,
	updateArticle,
	deleteArticle,
} = require("../controllers/ArticleController");

const {
	handleNewMenu,
	updateMenu,
	deleteMenu,
} = require("../controllers/MenuController");

const {
	handleNewRestaurant,
	handleLogin,
	deleteRestaurant,
	updateRestaurant,
} = require("../controllers/RestaurantController");

// RESTAURANT
router.get("/get", async (req, res) => {
	const posts = await Restaurant.find();
	res.send(posts);
});

router.post("/login", async (req, res) => {
	handleLogin(req, res);
});

router.post("/register", async (req, res) => {
	handleNewRestaurant(req, res);
});

router.delete("/delete/:id", async (req, res) => {
	deleteRestaurant(req, res);
});

router.put("/update/:id", async (req, res) => {
	updateRestaurant(req, res);
});

// ARTICLE
router.post("/create/article", async (req, res) => {
	handleNewArticle(req, res);
});

router.put("/edit/article/:id", async (req, res) => {
	updateArticle(req, res);
});

router.delete("/delete/article/:id", async (req, res) => {
	deleteArticle(req, res);
});

//MENU
router.post("/create/menu", async (req, res) => {
	handleNewMenu(req, res);
});

router.put("/edit/menu/:id", async (req, res) => {
	updateMenu(req, res);
});

router.delete("/delete/menu/:id", async (req, res) => {
	deleteMenu(req, res);
});

module.exports = router;
