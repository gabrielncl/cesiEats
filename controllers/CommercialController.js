const Commercial = require("../models/Commercial");
const handlePassword = require("../modules/hashPassword");
const bcryptjs = require("bcryptjs");
const { createJWT } = require("../modules/jwt");

const handleNewCommercial = async (req, res) => {
	const { email } = req.body;

	const newCommercial = new Commercial({
		email,
		password: await handlePassword(req, res),
	});

	await newCommercial.save((err, newCommercial) => {
		if (err) {
			res.status(500).json({
				message: "Commercial already exists",
				data: { status: "error", error: err },
			});
		} else {
			res.status(200).json({
				message: "Commercial Created",
				data: { status: "success", user: newCommercial },
			});
		}
	});
};

const handleLogin = async (req, res) => {
	const { email, password } = req.body;
	const com = await Commercial.findOne({ email: email });
	if (!com) {
		res.status(401).send("Invalid email or password");
	} else {
		const isValidPassword = await bcryptjs.compare(password, com.password);
		if (!isValidPassword) {
			res.status(401).send("Invalid email or password");
		} else {
			const token = createJWT(com);
			res
				.cookie("token", token, {
					httpOnly: true,
					maxAge: 1000 * 60 * 60,
				})
				.status(200)
				.json({
					message: "User Logged",
					data: { status: "success", com: com },
				});
		}
	}
};

const deleteCommercial = async (req, res) => {
	const deletedCom = await Commercial.findByIdAndDelete(req.params.id);
	if (!deletedCom) {
		res.status(401).json({
			message: "Commercial doesn't exist",
			data: { status: "error" },
		});
	} else {
		res.status(200).json({
			message: "Commercial Deleted",
			data: { status: "success", user: deletedCom },
		});
	}
};

const updateCommercial = async (req, res) => {
	const { email } = req.body;
	const updateCom = await Commercial.findByIdAndUpdate(req.params.id, {
		email,
		password: await handlePassword(req, res),
	});
	if (!updateCom) {
		res.status(401).json({
			message: "Commercial doesn't exist",
			data: { status: "error" },
		});
	} else {
		res.status(200).json({
			message: "Commercial Updated",
			data: { status: "success", user: updateCom },
		});
	}
};

module.exports = {
	handleNewCommercial,
	handleLogin,
	deleteCommercial,
	updateCommercial,
};
