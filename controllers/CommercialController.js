const Commercial = require("../models/Commercial");
const handlePassword = require("../modules/hashPassword");
const referrer = require("../modules/referrer");
//const jwt = require("jsonwebtoken");

const handleNewCommercial = async (req, res) => {
	const { email } =
		req.body;


	const newCommercial = new Commercial({
		email,
		password: await handlePassword(req, res),
	});

	await newCommercial.save();
	res.send(newCommercial);
};
module.exports = handleNewCommercial;
