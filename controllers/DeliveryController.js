const Delivery = require("../models/Delivery");
const { returnUserFromJwt } = require("../modules/jwt");

const handleNewDelivery = async (req, res) => {
	const { description, confirmDelivery, order_id } =
		req.body;

	const newDelivery = new Delivery({
		description,
        confirmDelivery,
        order_id,
	});
	await newDelivery.save();
	res.status(200).json({
		message: "Delivery Created",
		data: { status: "success", delivery: newDelivery },
	});
};

const getDelivery = async (req, res) => {
	const user = returnUserFromJwt(req, res);
	console.log(user);
	const orders = await Delivery.find({ user_id: user });
	res.status(200).json({
		message: "Delivery Fetched",
		data: { status: "success", orders },
	});
};

module.exports = { handleNewDelivery, getDelivery };
