const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = Schema({
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
	quantity: {
		type: Number,
	},
	photo: {
		type: String,
	},
	category: {
		type: String,
		required: true,
	},
	restaurantName:{
		type: String,
		required: true
	}
	//refreshToken: String,
});

module.exports = mongoose.model("Article", articleSchema);
