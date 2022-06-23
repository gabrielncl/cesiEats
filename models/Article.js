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
		type: Number,
		required: true,
	},
	photo: {
		type: String,
	},
	category_id: {
		type: Number,
		required: true,
	},
	restaurant_id:{
		type: String,
		required: true,
	}
});

module.exports = mongoose.model("Article", articleSchema);
