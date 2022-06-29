const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = Schema({
	user_id: {
		type: String,
	},
	restaurant_id: {
		type: String,
		default: "",
	},
	article: {
		type: Array,
		default: [],
	},
	menu_id: {
		type: Array,
		default: [],
	},
	totalPrice: {
		type: Number,
		default: 0,
	},
});
module.exports = mongoose.model("Cart", cartSchema);
