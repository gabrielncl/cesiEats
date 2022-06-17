const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const developerSchema = Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	//refreshToken: String,
});

module.exports = mongoose.model("Developer", developerSchema);
