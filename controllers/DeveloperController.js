const Developer = require("../models/Developer")
const handlePassword = require("../modules/hashPassword");
const bcryptjs = require("bcryptjs");
//const jwt = require("jsonwebtoken");

const handleNewDeveloper = async (req, res) => {
	const { email} =
		req.body;

	const newDev = new Developer({
		email,
		password: await handlePassword(req, res),
	});

	await newDev.save();
	res.status(200).json({
		message: "Developer Created",
		data: { status: "success", dev: newDev },
	});
};

const handleLogin = async (req, res) => {
	const { email, password } = req.body;
	const dev = await User.findOne({ email: email });
	if (!dev) {
		res.status(401).send("Invalid email or password");
	} else {
		const isValidPassword = await bcryptjs.compare(password, dev.password);
		if (!isValidPassword) {
			res.status(401).send("Invalid email or password");
		} else {
			const jwtToken = token(dev);
			res.status(200).json({
				message: "Developer Logged",
				data: { status: "success", dev: dev, token: jwtToken },
			});
		}
	}
};

const deleteDeveloper = async (req, res) => {
	const deletedDev = await Developer.findByIdAndDelete(req.params.id);
	res
		.status(200)
		.json({ message: "Developer Deleted", data: { status: "success", dev: deletedDev } });
};

const updateDeveloper = async (req, res) => {
	const { email } = req.body;
	const dev = await Developer.findByIdAndUpdate(req.params.id, {
		email,
		password: await handlePassword(req, res),
	});
	res
		.status(200)
		.json({ message: "Developer Updated", data: { status: "success", dev: dev } });
};

module.exports = {
	handleNewDeveloper,
	handleLogin,
	deleteDeveloper,
	updateDeveloper,
};
