const User = require("../models/User");
const handlePassword = require("../modules/hashPassword");
const referralCode = require("../modules/referralCode");
const bcryptjs = require("bcryptjs");
const { createJWT } = require("../modules/jwt");
const Cart = require("../models/Cart");

const handleNewUser = async (req, res) => {
	const { firstname, lastname, address, email, phone, referrer } = req.body;
	const { article_id, menu_id, totalPrice } = req.body;

	const newUser = new User({
		firstname,
		lastname,
		address,
		email,
		password: await handlePassword(req, res),
		phone,
		referralCode,
		referrer: ((await User.find({ referralCode: referrer }))[0] || {})._id,
	});

	await newUser.save((err, newUser) => {
		if (err) {
			res.status(500).json({
				message: "User already exists",
				data: { status: "error", error: err },
			});
		} else {
			res.status(200).json({
				message: "User Created",
				data: { status: "success", user: newUser },
			});
			const newCart = new Cart({
				user_id: newUser._id,
				article_id,
				menu_id,
				totalPrice,
			});
			newCart.save();
		}
	});
};

const handleLogin = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email: email });
	if (!user) {
		res.status(401).send("Invalid email or password");
	} else {
		const isValidPassword = await bcryptjs.compare(password, user.password);
		if (!isValidPassword) {
			res.status(401).send("Invalid email or password");
		} else {
			const token = createJWT(user);
			res
				.cookie("token", token, {
					httpOnly: true,
					maxAge: 1000 * 60 * 60,
				})
				.status(200)
				.json({
					message: "User Logged",
					token: token,
					user: user,
				});
		}
	}
};

const deleteUser = async (req, res) => {
	const deletedUser = await User.findByIdAndDelete(req.params.id);
	if (!deletedUser) {
		res.status(401).json({
			message: "User doesn't exist",
			data: { status: "error" },
		});
	} else {
		res.status(200).json({
			message: "User Deleted",
			data: { status: "success", user: deletedUser },
		});
	}
};

const updateUser = async (req, res) => {
	const { firstname, lastname, address, email, phone } = req.body;
	const updateUser = await User.findByIdAndUpdate(req.params.id, {
		firstname,
		lastname,
		address,
		email,
		phone,
		password: await handlePassword(req, res),
	});
	if (!updateUser) {
		res.status(401).json({
			message: "User doesn't exist",
			data: { status: "error" },
		});
	} else {
		res.status(200).json({
			message: "User Updated",
			data: { status: "success", user: updateUser },
		});
	}
};

module.exports = {
	handleNewUser,
	handleLogin,
	deleteUser,
	updateUser,
};
