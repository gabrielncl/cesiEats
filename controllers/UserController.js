const User = require("../models/User");
const handlePassword = require("../modules/hashPassword");
const referrer = require("../modules/referrer");
const bcrypt = require("bcrypt");
const token = require("../modules/jwt");

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

	await newUser.save();
	res.status(200).json({
		message: "User Created",
		data: { status: "success", user: newUser },
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
			const jwtToken = token(user);
			res.status(200).json({
				message: "User Logged",
				data: { status: "success", user: user, token: jwtToken },
			});
			res.cookie("token", jwtToken, {
				httpOnly: true,
			})
		}
	}
};

const deleteUser = async (req, res) => {
	const deletedUser = await User.findByIdAndDelete(req.params.id);
	res
		.status(200)
		.json({ message: "User Deleted", data: { status: "success", user: deletedUser } });
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
