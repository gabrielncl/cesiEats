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
	const article = await Article.findById(req.params.id);
	const restaurant = await Restaurant.find({ _id: article.restaurant._id });
	const cart = await Cart.findOneAndUpdate(
		{ user_id: returnUserFromJwt(req, res) },
		{
			$push: {
				article: article,
			},
			restaurant: restaurant,
			restaurant_id: restaurant[0]._id,
		}
	);
	if (!cart) {
		res.status(500).json({
			message: "Error",
			data: { status: "error", error: updateCart },
		});
	} else {
		res.status(200).json({
			message: "Cart Updated",
			cart: cart,
		});
	}
};

const deleteCart = async (req, res) => {
	const updateCart = await Cart.findOneAndUpdate(
		{ user_id: returnUserFromJwt(req, res) },
		{
			restaurant: "",
			article: [],
			menu: [],
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
			payCart: payCart,
		});
	}
};

module.exports = { updateCart, getCart, payCart };
