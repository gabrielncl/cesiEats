const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	photo: {
		type: String,
	},
	category: {
		type: Object,
	},
	restaurant:{
		type: Object,
	},
	restaurant_id: {
		type: String,
	},
});

module.exports = mongoose.model("Article", articleSchema);
