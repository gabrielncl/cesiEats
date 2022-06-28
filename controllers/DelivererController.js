const Deliverer = require("../models/Deliverer");
const handlePassword = require("../modules/hashPassword");
const referralCode = require("../modules/referralCode");
const bcryptjs = require("bcryptjs");
const { createJWT } = require("../modules/jwt");

const handleNewDeliverer = async (req, res) => {
	const { firstname, lastname, address, email, phone, referrer } = req.body;

	const newDeliverer = new Deliverer({
		firstname,
		lastname,
		address,
		email,
		password: await handlePassword(req, res),
		phone,
		referralCode,
		referrer: ((await Deliverer.find({ referralCode: referrer }))[0] || {})._id,
	});

	await newDeliverer.save((err, newDeliverer) => {
		if (err) {
			console.error(err);
			res.status(500).json({
				message: "Deliverer already exists",
				data: { status: "error", error: err },
			});
		} else {
			res.status(200).json({
				message: "Deliverer Created",
				data: { status: "success", user: newDeliverer },
			});
		}
	});
};

const handleLogin = async (req, res) => {
	const { email, password } = req.body;
	const deliverer = await Deliverer.findOne({ email: email });
	if (!deliverer) {
		res.status(401).send("Invalid email or password");
	} else {
		const isValidPassword = await bcryptjs.compare(
			password,
			deliverer.password
		);
		if (!isValidPassword) {
			res.status(401).send("Invalid email or password");
		} else {
			const token = createJWT(deliverer);
			res.cookie("token", token, {
				httpOnly: true,
				maxAge: 1000 * 60 * 60,
			});
			res.status(200).json({
				message: "Deliverer Logged",
				token: token,
				deliverer: deliverer,
			});
		}
	}
};

const deleteDeliverer = async (req, res) => {
	const deletedDeliverer = await Deliverer.findByIdAndDelete(req.params.id);
	if (!deletedDeliverer) {
		res.status(401).json({
			message: "Deliverer doesn't exist",
			data: { status: "error" },
		});
	} else {
		res.status(200).json({
			message: "Deliverer Deleted",
			data: { status: "success", user: deletedDeliverer },
		});
	}
};

module.exports = {
	handleNewDeliverer,
	handleLogin,
	deleteDeliverer,
};
