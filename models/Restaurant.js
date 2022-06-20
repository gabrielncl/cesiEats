const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = Schema({
	name: {
		type: String,
	},
	address: {
		type: String,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	phone: {
		type: Number,
	},
	referrer: {
		type: String,
	},
    logo: {
		type: String,
	},
    category: {
		type: String,
	},
	//refreshToken: String,
});

module.exports = mongoose.model("User", restaurantSchema);
