const Commercial = require("../models/Commercial");
//const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const handleNewCommercial = async (req, res) => {
	const { email, password} =
		req.body;

	hashed_password = await bcrypt.hash(password, 8);


	const newCommercial = new Commercial({
		email,
		password: hashed_password,
	});

	await newCommercial.save();
	res.send(newCommercial);
};
module.exports = handleNewCommercial;
