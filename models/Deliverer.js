const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const delivererSchema = Schema({
	firstname: {
		type: String,
	},
	lastname: {
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
    photo: {
		type: String,
	},
	//refreshToken: String,
});

module.exports = mongoose.model("Deliverer", delivererSchema);
