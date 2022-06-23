const { returnUserFromJwt } = require("../modules/jwt");
const Restaurant = require("../models/Restaurant");
const Article = require("../models/Article");

getRestaurants = async (req, res) => {
	const restaurants = await Restaurant.find();
	res.status(200).json({
		message: "Restaurants Fetched",
		data: { status: "success", restaurants },
	});
};

getArticlesFromRestaurant = async (req, res) => {
    const id = req.params.id;
	const articles = await Article.find({ restaurant_id: id });
	res.status(200).json({
		message: "Articles Fetched",
		data: { status: "success", articles },
	});
};

module.exports = { getRestaurants, getArticlesFromRestaurant };