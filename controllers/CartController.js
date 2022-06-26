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
					data: { status: "success", cart },
				});
			}
		}
	);
};

const updateCart = async (req, res) => {
	const id = req.params.id;
	//console.log(id);
	const article = Article.findById(req.params.id);
	const restaurant = Restaurant.find({ _id: article.restaurant_id });
	//console.log(restaurant._id);
	const updateCart = await Cart.findOneAndUpdate(
		{ user_id: returnUserFromJwt(req, res) },
		{
			$push: {
				article_id: id,
			},
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
			article_id: [],
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
