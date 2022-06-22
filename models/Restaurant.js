const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = Schema({
	name: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	phone: {
		type: Number,
		required: true,
		unique: true,
	},
	referrer: {
		type: String,
	},
	referralCode: {
		type: String,
	},
    logo: {
		type: String,
	},
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
