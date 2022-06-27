const Article = require("../models/Article");
const { returnUserFromJwt } = require("../modules/jwt");

// ARTICLE
const handleNewArticle = async (req, res) => {
	const { name, description, price, photo, category_id } = req.body;

	const newArticle = new Article({
		name,
		description,
		price,
		photo,
		category_id,
		restaurant_id: returnUserFromJwt(req, res)
	});

	await newArticle.save();
	res.status(200).json({
		message: "Article Created",
		data: { status: "success", article: newArticle },
	});
};

const deleteArticle = async (req, res) => {
	const deletedArticle = await Article.findByIdAndDelete(req.params.id);
	res.status(200).json({
		message: "Article Deleted",
		data: { status: "success", article: deletedArticle },
	});
};

const updateArticle = async (req, res) => {
	const { name, price, photo, description, category, restaurantName } =
		req.body;
	const article = await Article.findByIdAndUpdate(req.params.id, {
		name,
		price,
		photo,
		description,
		category,
		restaurantName,
	});
	res.status(200).json({
		message: "Article Updated",
		data: { status: "success", article: article },
	});
};

getArticle = async (req, res) => {
	const article = await Article.findById(req.params.id);
	res.status(200).json({
		message: "Article Fetched",
		data: { status: "success", article },
	});
};

module.exports = {
	handleNewArticle,
	updateArticle,
	deleteArticle,
	getArticle,
};
