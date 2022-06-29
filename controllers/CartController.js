const Cart = require("../models/Cart");
const Article = require("../models/Article");
const Restaurant = require("../models/Restaurant");
const { handleNewOrder } = require("../controllers/OrderController");
const { returnUserFromJwt } = require("../modules/jwt");

const getCart = (req, res, next) => {
	const cart = Cart.findOne(
		{ user_id: returnUserFromJwt(req, res) },
		(err, cart) => {
			if (err) {
				res.status(500).json({
					message: "Error",
					data: { status: "error", error: err },
				});
			} else {
				res.status(200).json({
					message: "Cart",
					cart: cart,
				});
			}
		}
	);
};

const updateCart = async (req, res) => {
	const id = req.params.id;
	const article = await Article.findById(req.params.id);
	const restaurant = await Restaurant.find({ _id: article.restaurant_id });
	const updateCart = await Cart.findOneAndUpdate(
		{ user_id: returnUserFromJwt(req, res) },
		{
			$push: {
				article: {
					article_id: id,
					restaurant_id: restaurant._id,
					name: article.name,
					price: article.price,
					image: article.image,
					description: article.description,
					category_id: article.category_id,
				},
			},
			restaurant_id: restaurant[0]._id,
		}
	);
	if (!updateCart) {
		res.status(500).json({
			message: "Error",
			data: { status: "error", error: err },
		});
	} else {
		res.status(200).json({
			message: "Cart Updated",
			data: { status: "success", cart: updateCart },
		});
	}
};

const deleteCart = async (req, res) => {
	const updateCart = await Cart.findOneAndUpdate(
		{ user_id: returnUserFromJwt(req, res) },
		{
			restaurant_id: "",
			article: [],
			menu_id: [],
			totalPrice: null,
		}
	);
};

const payCart = async (req, res) => {
	const payCart = await Cart.findOneAndUpdate({
		user_id: returnUserFromJwt(req, res),
	});
	if (!payCart) {
		res.status(500).json({
			message: "Error",
			data: { status: "error", error: err },
		});
	} else {
		handleNewOrder(req, res);
		deleteCart(req, res);
		res.status(200).json({
			message: "Order Placed",
			data: { status: "success", cart: payCart },
		});
	}
};

module.exports = { updateCart, getCart, payCart };
