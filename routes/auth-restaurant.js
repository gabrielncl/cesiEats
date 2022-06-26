var express = require("express");
var router = express.Router();

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

const { handleNewDelivery, getDelivery } = require("../controllers/DeliveryController");

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

router.post("/article/create", checkJWT, async (req, res) => {
	handleNewArticle(req, res);
});

router.put("/article/edit/:id", checkJWT, async (req, res) => {
	updateArticle(req, res);
});

router.delete("/article/delete/:id", checkJWT, async (req, res) => {
	deleteArticle(req, res);
});

//MENU

router.post("/menu/create", checkJWT, async (req, res) => {
	handleNewMenu(req, res);
});

router.put("/menu/edit/:id", checkJWT, async (req, res) => {
	updateMenu(req, res);
});

router.delete("/menu/delete/:id", checkJWT, async (req, res) => {
	deleteMenu(req, res);
});

router.get("/orders", checkJWT, async (req, res, next) => {
	getOrders(req, res);
});

//DELIVERY
router.get("/delivery/create", checkJWT, async (req, res, next) => {
	getDelivery(req, res);
});

router.get("/delivery", checkJWT, async (req, res, next) => {
	handleNewDelivery(req, res);
});

module.exports = router;
