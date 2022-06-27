const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = Schema({
	user_id: {
		type: String,
		required: true,
	},
	restaurant_id: {
		type: String,
	},
	description: {
		type: String,
	},
	totalprice: {
		type: Number,
	},
	deliveryAddress: {
		type: String,
	},
	article_id: {
		type: Array,
		default: [],
	},
	menu_id: {
		type: Array,
		default: [],
	},
	confirmOrder: {
		type: Boolean,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	isAcceptedByRestaurant: {
		type: Boolean,
		default: false,
	},
	whoDelivers: {
		type: String,
        default: "",
	},
	isDelivered: {
		type: Boolean,
		default: false,
	},
});
module.exports = mongoose.model("Order", orderSchema);
