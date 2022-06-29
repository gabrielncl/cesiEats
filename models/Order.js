const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = Schema({
	user: {
		type: Object,
		required: true,
	},
	restaurant: {
		type: Object,
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
	article: {
		type: Array,
		default: [],
	},
	menu: {
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
		type: Object,
		default: "",
	},
	isDelivered: {
		type: Boolean,
		default: false,
	},
});
module.exports = mongoose.model("Order", orderSchema);
