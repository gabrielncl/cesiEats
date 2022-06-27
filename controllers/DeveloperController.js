const Developer = require("../models/Developer");
const handlePassword = require("../modules/hashPassword");
const bcryptjs = require("bcryptjs");
const { createJWT } = require("../modules/jwt");

const handleNewDeveloper = async (req, res) => {
	const { email } = req.body;

	const newDev = new Developer({
		email,
		password: await handlePassword(req, res),
	});

	await newDev.save((err, newDev) => {
		if (err) {
			console.error(err);
			res.status(500).json({
				message: "Developer already exists",
				data: { status: "error", error: err },
			});
		} else {
			res.status(200).json({
				message: "Developer Created",
				data: { status: "success", dev: newDev },
			});
		}
	});
};

const handleLogin = async (req, res) => {
	const { email, password } = req.body;
	const dev = await Developer.findOne({ email: email });
	if (!dev) {
		res.status(401).send("Invalid email or password");
	} else {
		const isValidPassword = await bcryptjs.compare(password, dev.password);
		if (!isValidPassword) {
			res.status(401).send("Invalid email or password");
		} else {
			const token = createJWT(dev);
			res
				.cookie("token", token, {
					httpOnly: true,
					maxAge: 1000 * 60 * 60,
				})
				.status(200)
				.json({
					message: "Developer Logged",
					data: { status: "success", dev: dev },
				});
		}
	}
};

const deleteDeveloper = async (req, res) => {
	const deletedDev = await Developer.findByIdAndDelete(req.params.id);
	if (!deletedDev) {
		res.status(401).json({
			message: "Developer doesn't exist",
			data: { status: "error" },
		});
	} else {
		res.status(200).json({
			message: "Developer Deleted",
			data: { status: "success", dev: deletedDev },
		});
	}
};

const updateDeveloper = async (req, res) => {
	const { email } = req.body;
	const updateDev = await Developer.findByIdAndUpdate(req.params.id, {
		email,
		password: await handlePassword(req, res),
	});
	if (!updateDev) {
		res.status(401).json({
			message: "Developer doesn't exist",
			data: { status: "error" },
		});
	} else {
		res.status(200).json({
			message: "Developer Updated",
			data: { status: "success", dev: updateDev },
		});
	}
};

module.exports = {
	handleNewDeveloper,
	handleLogin,
	deleteDeveloper,
	updateDeveloper,
};
