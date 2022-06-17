const User = require("../models/User");
//const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
	const { firstname, lastname, address, email, password, phone } =
		req.body;

	hashed_password = await bcrypt.hash(password, 8);
	referrer = Math.random().toString(36).substring(2,8).toUpperCase();


	const newUser = new User({
		firstname,
		lastname,
		address,
		email,
		password: hashed_password,
		phone,
		referrer,
	});

	await newUser.save();
	res.send(newUser);
};
module.exports = handleNewUser;
