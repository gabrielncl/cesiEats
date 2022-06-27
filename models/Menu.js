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
		type: Number,
		required: true,
	},
	photo: {
		type: String,
	},
	restaurant_id: {
		type: Number,
	},
    article_id: {
		type: Array,
		default:[],
	},
	//refreshToken: String,
});

module.exports = mongoose.model("Menu", menuSchema);
