const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
	firstname: {
		type: String,
		required: true,
	},
	lastname: {
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
		required: true,
		unique: true,
	},
	refreshToken: String,
});

module.exports = mongoose.model("User", userSchema);
