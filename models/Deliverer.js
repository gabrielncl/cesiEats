const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const delivererSchema = Schema({
	firstname: {
		type: String,
		required: true,
	},
	lastname: {
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
	},
	referralCode: {
		type: String,
	},
	referrer: {
		type: String,
	},
});

module.exports = mongoose.model("Deliverer", delivererSchema);
