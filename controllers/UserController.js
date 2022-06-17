const User = require("../models/User");
const handlePassword = require("../modules/hashPassword");
const referrer = require("../modules/referrer");
//const jwt = require("jsonwebtoken");

const handleNewUser = async (req, res) => {
	const { firstname, lastname, address, email, phone } =
		req.body;


	const newUser = new User({
		firstname,
		lastname,
		address,
		email,
		password: await handlePassword(req, res),
		phone,
		referrer,
	});

	await newUser.save();
	res.send(newUser);
};
module.exports = handleNewUser;
