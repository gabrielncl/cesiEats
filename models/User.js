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
	//refreshToken: String,
});

module.exports = mongoose.model("User", userSchema);
