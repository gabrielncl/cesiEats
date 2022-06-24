var express = require("express");
var router = express.Router();

const Restaurant = require("../models/Restaurant");

const { checkJWT } = require("../modules/jwt");

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
/*router.get("/get", async (req, res) => {
	const posts = await Restaurant.find();
	res.send(posts);
});*/

router.post("/login", async (req, res) => {
	handleLogin(req, res);
});

router.post("/register", async (req, res) => {
	handleNewRestaurant(req, res);
});

router.delete("/delete/:id", checkJWT, async (req, res) => {
	deleteRestaurant(req, res);
});

router.put("/update/:id", checkJWT, async (req, res) => {
	updateRestaurant(req, res);
});

// ARTICLE
router.post("/create/article", checkJWT, async (req, res) => {
	handleNewArticle(req, res);
});

router.put("/edit/article/:id", checkJWT, async (req, res) => {
	updateArticle(req, res);
});

router.delete("/delete/article/:id", checkJWT, async (req, res) => {
	deleteArticle(req, res);
});

//MENU
router.post("/create/menu", checkJWT, async (req, res) => {
	handleNewMenu(req, res);
});

router.put("/edit/menu/:id", checkJWT, async (req, res) => {
	updateMenu(req, res);
});

router.delete("/delete/menu/:id", checkJWT, async (req, res) => {
	deleteMenu(req, res);
});

router.get("/orders", checkJWT, async (req, res, next) => {
	getOrders(req, res);
});

module.exports = router;
