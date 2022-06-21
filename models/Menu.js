const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	price: {
		type: String,
		required: true,
	},
	photo: {
		type: String,
	},
	restaurantName: {
		type: String,
		required: true,
	},
    articleName: {
		type: String,
		required: true,
	},
	//refreshToken: String,
});

module.exports = mongoose.model("Menu", menuSchema);
