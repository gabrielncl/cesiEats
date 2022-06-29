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
	},
	photo: {
		type: String,
	},
	category_id: {
		type: Number,
	},
	restaurant:{
		type: Object,
	}
});

module.exports = mongoose.model("Article", articleSchema);
