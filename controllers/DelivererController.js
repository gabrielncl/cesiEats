const Deliverer = require("../models/Deliverer");
const handlePassword = require("../modules/hashPassword");
const referralCode = require("../modules/referralCode");
const bcrypt = require("bcrypt");
const token = require("../modules/jwt");

const handleNewDeliverer = async (req, res) => {
	const { firstname, lastname, address, email, phone, photo, referrer } =
		req.body;

	const newDeliverer = new Deliverer({
		firstname,
		lastname,
		address,
		email,
		password: await handlePassword(req, res),
		phone,
		referralCode,
		referrer: ((await Deliverer.find({ referralCode: referrer }))[0] || {})._id,
		photo,
	});

	await newDeliverer.save();
	res.status(200).json({
		message: "Deliverer Created",
		data: { status: "success", deliverer: newDeliverer },
	});
};

const handleLogin = async (req, res) => {
	const { email, password } = req.body;
	const deliverer = await Deliverer.findOne({ email: email });
	if (!deliverer) {
		res.status(401).send("Invalid email or password");
	} else {
		const isValidPassword = await bcrypt.compare(password, deliverer.password);
		if (!isValidPassword) {
			res.status(401).send("Invalid email or password");
		} else {
			const jwtToken = token(deliverer);
			res.status(200).json({
				message: "Deliverer Logged",
				data: { status: "success", deliverer: deliverer, token: jwtToken },
			});
		}
	}
};

const deleteDeliverer = async (req, res) => {
	const deletedDeliverer = await Deliverer.findByIdAndDelete(req.params.id);
	res
		.status(200)
		.json({
			message: "Deliverer Deleted",
			data: { status: "success", deliverer: deletedDeliverer },
		});
};

const updateDeliverer = async (req, res) => {
	const { firstname, lastname, photo, email, phone } = req.body;
	const deliverer = await Deliverer.findByIdAndUpdate(req.params.id, {
		firstname,
		lastname,
		email,
		phone,
		password: await handlePassword(req, res),
		photo,
	});
	res
		.status(200)
		.json({
			message: "Deliverer Updated",
			data: { status: "success", deliverer: deliverer },
		});
};

module.exports = {
	handleNewDeliverer,
	handleLogin,
	deleteDeliverer,
	updateDeliverer,
};
