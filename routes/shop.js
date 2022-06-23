var express = require("express");
var router = express.Router();
const {
	getRestaurants,
	getArticlesFromRestaurant,
} = require("../controllers/ShopController");
const { getArticle } = require("../controllers/ArticleController");

router.get("/", async (req, res, next) => {
	getRestaurants(req, res);
});

router.get("/:id", async (req, res, next) => {
	getArticlesFromRestaurant(req, res);
})

router.get("/restaurant/:id", async (req, res, next) => {
	getArticle(req, res);
})



module.exports = router;
