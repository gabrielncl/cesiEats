const Order = require("../models/Order");
const { returnUserFromJwt } = require("../modules/jwt");

const handleNewOrder = async (req, res) => {
	const { description, totalprice, deliveryAdress, article_id, menu_id } =
		req.body;

	const newOrder = new Order({
		user_id: returnUserFromJwt(req, res),
		description,
		totalprice,
		deliveryAdress,
		article_id,
		menu_id,
	});
	await newOrder.save();
	res.status(200).json({
		message: "Order Created",
		data: { status: "success", order: newOrder },
	});
};

const getOrders = async (req, res) => {
	const user = returnUserFromJwt(req, res);
	console.log(user);
	const orders = (await Order.find({ user_id: user }));
	res.status(200).json({
		message: "Orders Fetched",
		data: { status: "success", orders },
	});
};

module.exports = { handleNewOrder, getOrders };
