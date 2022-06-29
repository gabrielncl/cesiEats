var express = require("express");
var router = express.Router();

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

const { getOrdersByRestaurant, validateOrder } = require("../controllers/OrderController");

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

router.post("/article/create", async (req, res) => {
	handleNewArticle(req, res);
});

router.put("/article/edit/:id", async (req, res) => {
	updateArticle(req, res);
});

router.delete("/article/delete/:id", async (req, res) => {
	deleteArticle(req, res);
});

//MENU

/*
router.post("/menu/create", async (req, res) => {
	handleNewMenu(req, res);
});

router.put("/menu/edit/:id", async (req, res) => {
	updateMenu(req, res);
});

router.delete("/menu/delete/:id", async (req, res) => {
	deleteMenu(req, res);
});
*/

//ORDERS

router.get("/orders", async (req, res, next) => {
	getOrdersByRestaurant(req, res);
});

router.put("/orders/validate/:id", async (req, res, next) => {
	validateOrder(req, res);
});

module.exports = router;