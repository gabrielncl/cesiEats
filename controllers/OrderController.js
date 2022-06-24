const Order = require("../models/Order");
const { returnUserFromJwt } = require("../modules/jwt");

const handleNewOrder = async (req, res) => {
	const { description, totalprice, deliveryAddress, article_id, menu_id } =
		req.body;

	const newOrder = new Order({
		user_id: returnUserFromJwt(req, res),
		description,
		totalprice,
		deliveryAddress,
		article_id,
		menu_id,
	});
	await newOrder.save((err, newOrder) => {
		if (err) {
			console.error(err);
			res.status(500).json({
				message: "Order already exists",
				data: { status: "error", error: err },
			});
		} else {
			res.status(200).json({
				message: "Order Created",
				data: { status: "success", order: newOrder },
			});
		}
	});
};

const getOrders = async (req, res) => {
	const user = returnUserFromJwt(req, res);
	const orders = await Order.find({ user_id: user });
	res.status(200).json({
		message: "Orders Fetched",
		data: { status: "success", orders },
	});
}
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
