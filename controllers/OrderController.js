const Order = require("../models/Order");
const Cart = require("../models/Cart");
const { returnUserFromJwt, returnObjectFromJwt } = require("../modules/jwt");

const handleNewOrder = async (req, res) => {
	const cart = await Cart.findOne({ user_id: returnUserFromJwt(req, res) });
	console.log(cart);
	const { description, deliveryAddress } = req.body;

	const newOrder = new Order({
		user: returnObjectFromJwt(req, res),
		description,
		deliveryAddress,
		article: cart.article,
		menu: cart.menu,
		restaurant: cart.restaurant,
		restaurant_id: cart.restaurant_id,
	});
	await newOrder.save();
};

const validateOrder = async (req, res) => {
	const order = await Order.findOne({
		restaurant_id: returnUserFromJwt(req, res),
	});
	order.isAcceptedByRestaurant = true;
	await order.save();
	res.status(200).json({
		message: "Order Accepted",
		data: { status: "success", order },
	});
};

const getAvailableOrders = async (req, res) => {
	const orders = await Order.find({
		isAcceptedByRestaurant: true,
		isDelivered: false,
		whoDelivers: "",
	});
	res.status(200).json({
		message: "Orders Available",
		orders: orders,
	});
};

const chooseOrderToDeliver = async (req, res) => {
	const order = req.params.id;
	const user = returnObjectFromJwt(req, res);
	const orderToDeliver = await Order.findByIdAndUpdate(order, {
		whoDelivers: user,
	});
	res.status(200).json({
		message: "Order Delivering",
		data: { status: "success", orderToDeliver },
	});
};

const delivered = async (req, res) => {
	const order = req.params.id;
	const orderDelivered = await Order.findByIdAndUpdate(order, {
		isDelivered: true,
	});
	res.status(200).json({
		message: "Order Delivered",
		data: { status: "success", orderDelivered },
	});
};

const getOrders = async (req, res) => {
	const user = returnUserFromJwt(req, res);
	const orders = await Order.find({ user_id: user });
	res.status(200).json({
		message: "Orders Fetched",
		orders: orders,
	});
};

getOrdersByRestaurant = async (req, res) => {
	const restaurant = returnUserFromJwt(req, res);
	const orders = await Order.find({ restaurant_id: restaurant });
	res.status(200).json({
		message: "Orders Fetched",
		orders: orders,
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

const getAllOrders = async (req, res) => {
	const orders = await Order.find();
	res.status(200).json({
		message: "Orders Fetched",
		data: { status: "success", orders },
	});
};

module.exports = {
	handleNewOrder,
	getOrders,
	getOrder,
	getOrdersByRestaurant,
	validateOrder,
	getAvailableOrders,
	chooseOrderToDeliver,
	delivered,
	getAllOrders,
};
