const Article = require("../models/Article");
const bcrypt = require("bcrypt");


// ARTICLE 
const handleNewArticle = async (req, res) => {
	const { name, description, price, photo, category } = req.body;

	const newArticle = new Article({
		name,
		description,
		price,
		photo,
		category,
	});

	await newArticle.save();
	res.status(200).json({
		message: "Article Created",
		data: { status: "success", article: newArticle },
	});
};

const deleteArticle = async (req, res) => {
	const deletedArticle = await Article.findByIdAndDelete(req.params.id);
	res
		.status(200)
		.json({ message: "Article Deleted", data: { status: "success", article: deleteArticle } });
};

const updateArticle = async (req, res) => {
	const { name, price, photo, description, category } = req.body;
	const article = await Article.findByIdAndUpdate(req.params.id, {
		name,
		price,
		photo,
		description,
		category,
	});
	res
		.status(200)
		.json({ message: "Article Updated", data: { status: "success", article: article } });
};

module.exports = {
    handleNewArticle,
    updateArticle,
    deleteArticle
};