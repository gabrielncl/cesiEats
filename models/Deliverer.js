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
	referrer: {
		type: String,
	},
	referralCode: {
		type: String,
	},
    photo: {
		type: String,
	},
	//refreshToken: String,
});

module.exports = mongoose.model("Deliverer", delivererSchema);
