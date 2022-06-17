const Developer = require("../models/Developer")
const handlePassword = require("../modules/hashPassword");
const referrer = require("../modules/referrer");
//const jwt = require("jsonwebtoken");

const handleNewDeveloper = async (req, res) => {
	const { email} =
		req.body;


	const newdev = new Developer({
		email,
		password: await handlePassword(req, res),
	});

	await newdev.save();
	res.send(newdev);
};
module.exports = handleNewDeveloper;
