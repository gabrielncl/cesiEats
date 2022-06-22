const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
	firstname: {
		type: String,
	},
	lastname: {
		type: String,
	},
	address: {
		type: String,
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
	},
	referralCode: {
		type: String,
	},
	referrer: {
		type: String,
	},
	order_id: {
		type: Array,
		default: [],
	},

});

module.exports = mongoose.model("User", userSchema);
