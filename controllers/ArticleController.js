const Article = require("../models/Article");
const { returnObjectFromJwt, returnUserFromJwt } = require("../modules/jwt");

// ARTICLE
const getArticles = async (req, res) => {
	const restaurant = await returnUserFromJwt(req, res);
	const articles = await Article.find({ restaurant_id: restaurant });
	res.status(200).json({
		message: "Articles Fetched",
		articles: articles,
	});
};

const handleNewArticle = async (req, res) => {
	const { name, description, price, photo, category } = req.body;
	const restaurant = await returnObjectFromJwt(req, res);
	console.log(restaurant);
	const article = new Article({
		name,
		description,
		price,
		photo,
		category,
		restaurant,
		restaurant_id: restaurant._id,
	});

	await article.save();
	res.status(200).json({
		message: "Article Created",
		article: article,
	});
};

const deleteArticle = async (req, res) => {
	const deletedArticle = await Article.findByIdAndDelete(req.params.id);
	res.status(200).json({
		message: "Article Deleted",
		deletedArticle: deletedArticle,
	});
};

const updateArticle = async (req, res) => {
	const { name, price, photo, description, category } = req.body;
	const restaurant = await returnObjectFromJwt(req, res);
	const article = await Article.findByIdAndUpdate(req.params.id, {
		name,
		price,
		photo,
		description,
		category,
		restaurant,
	});
	res.status(200).json({
		message: "Article Updated",
		article: article,
	});
};

getArticle = async (req, res) => {
	const article = await Article.findById(req.params.id);
	res.status(200).json({
		message: "Article Fetched",
		article: article,
	});
};

module.exports = {
	handleNewArticle,
	updateArticle,
	deleteArticle,
	getArticle,
	getArticles,
};
