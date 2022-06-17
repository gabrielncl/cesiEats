const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commercialsSchema = Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	refreshToken: String,
});

module.exports = mongoose.model("Commercial", commercialsSchema);
