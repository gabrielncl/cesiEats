const User = require("../models/User");
const handlePassword = require("../modules/hashPassword");
const referrer = require("../modules/referrer");
const bcrypt = require("bcrypt");
const { createJWT, checkJWT } = require("../modules/jwt");

const handleNewUser = async (req, res) => {
	const { firstname, lastname, address, email, phone } = req.body;

	const newUser = new User({
		firstname,
		lastname,
		address,
		email,
		password: await handlePassword(req, res),
		phone,
		referrer,
	});

	await newUser.save((err, newUser) => {
		if (err) {
			res
				.status(500)
				.json({
					message: "User already exists",
					data: { status: "error", error: err },
				});
		} else {
			res.status(200).json({
				message: "User Created",
				data: { status: "success", user: newUser },
			});
		}
	});
};

const handleLogin = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email: email });
	if (!user) {
		res.status(401).send("Invalid email or password");
	} else {
		const isValidPassword = await bcrypt.compare(password, user.password);
		if (!isValidPassword) {
			res.status(401).send("Invalid email or password");
		} else {
			const token = createJWT(user);
			res
				.cookie("token", token, {
					httpOnly: true,
					maxAge: 1000,
				})
				.status(200)
				.json({
					message: "User Logged",
					data: { status: "success", user: user },
				});
		}
	}
};

const deleteUser = async (req, res) => {
	const deletedUser = await User.findByIdAndDelete(req.params.id);
	res.status(200).json({
		message: "User Deleted",
		data: { status: "success", user: deletedUser },
	});
};

const updateUser = async (req, res) => {
	const { firstname, lastname, address, email, phone } = req.body;
	const user = await User.findByIdAndUpdate(req.params.id, {
		firstname,
		lastname,
		address,
		email,
		phone,
		password: await handlePassword(req, res),
	});
	res
		.status(200)
		.json({ message: "User Updated", data: { status: "success", user: user } });
};

module.exports = {
	handleNewUser,
	handleLogin,
	deleteUser,
	updateUser,
};
