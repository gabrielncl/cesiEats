const Order = require("../models/Order");
const Cart = require("../models/Cart");
const { returnUserFromJwt } = require("../modules/jwt");

const handleNewOrder = async (req, res) => {
	const cart = await Cart.findOne({ user_id: returnUserFromJwt(req, res) });
	const { description, deliveryAddress } = req.body;

	const newOrder = new Order({
		user_id: returnUserFromJwt(req, res),
		description,
		deliveryAddress,
		article_id: cart.article_id,
		menu_id: cart.menu_id,
	});
	await newOrder.save();
};

const getOrders = async (req, res) => {
	const user = returnUserFromJwt(req, res);
	const orders = await Order.find({ user_id: user });
	res.status(200).json({
		message: "Orders Fetched",
		data: { status: "success", orders },
	});
};
const getOrder = async (req, res) => {
	const id = req.params.id;
	const order = await Order.findById(id);
	res.status(200).json({
		message: "Order Fetched",
		data: { status: "success", order },
	});
};

/*const deleteOrder = async (req, res) => {
	const restaurant_id = returnUserFromJwt(req, res);
	const { id } = req.body;
	const deletedOrder = Order.findByIdAndDelete(id);
	res.status(200).json({
		message: "Restaurant Deleted",
		data: { status: "success", order: deletedOrder },
	});
};*/

module.exports = { handleNewOrder, getOrders, getOrder };
