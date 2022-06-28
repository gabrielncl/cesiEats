var express = require("express");
var router = express.Router();
const {
	getRestaurants,
	getArticlesFromRestaurant,
} = require("../controllers/ShopController");
const { getArticle } = require("../controllers/ArticleController");
const { checkJWT } = require("../modules/jwt");

router.get("/", checkJWT, async (req, res, next) => {
	getRestaurants(req, res);
});

router.get("/:id", checkJWT, async (req, res, next) => {
	getArticlesFromRestaurant(req, res);
})

router.get("/restaurant/:id", checkJWT, async (req, res, next) => {
	getArticle(req, res);
})



module.exports = router;
