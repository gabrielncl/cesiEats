const Restaurant = require("../models/Restaurant");
const handlePassword = require("../modules/hashPassword");
const referralCode = require("../modules/referralCode");
const bcryptjs = require("bcryptjs");
const token = require("../modules/jwt");

// AUTHENTIFICATION
const handleNewRestaurant = async (req, res) => {
	const { name, address, email, phone, logo, referrer } = req.body;

	const newRestaurant = new Restaurant({
		name,
		address,
		email,
		password: await handlePassword(req, res),
		phone,
        logo,
		referralCode,
		referrer: ((await Restaurant.find({ referralCode: referrer }))[0] || {})._id,
	});

	await newRestaurant.save((err, newRestaurant));
	if (err) {
		console.error(err);
		res.status(500).json({
			message: "Restaurant already exists",
			data: { status: "error", error: err },
		});
	} else {
		res.status(200).json({
			message: "Restaurant Created",
			data: { status: "success", user: newRestaurant },
		});
	}
};

const handleLogin = async (req, res) => {
	const { email, password } = req.body;
	const restaurant = await Restaurant.findOne({ email: email });
	if (!restaurant) {
		res.status(401).send("Invalid email or password");
	} else {
		const isValidPassword = await bcryptjs.compare(password, restaurant.password);
		if (!isValidPassword) {
			res.status(401).send("Invalid email or password");
		} else {
			const jwtToken = token(restaurant);
			res.status(200).json({
				message: "restaurant Logged",
				data: { status: "success", restaurant: restaurant, token: jwtToken },
			});
		}
	}
};

const deleteRestaurant = async (req, res) => {
	const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
	if (!deletedRestaurant) {
		res.status(401).json({
			message: "Restaurant doesn't exist",
			data:{ status: "error"}
		}); 
	} else {
		res.status(200).json({
			message: "Restaurant Deleted",
			data: { status: "success", user: deletedRestaurant },
		});
	}
};

const updateRestaurant = async (req, res) => {
	const { name, address, email, phone, logo } = req.body;
	const updateRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, {
		name,
		address,
		email,
		password: await handlePassword(req, res),
		phone,
		referrer,
        logo,
	});
	if (!updateRestaurant) {
		res.status(401).json({
			message: "Restaurant doesn't exist",
			data:{ status: "error"}
		});  
	} else {
		res.status(200).json({
			message: "Restaurant Updated",
			data: { status: "success", user: updateRestaurant },
		});
	}
};

module.exports = {
	handleNewRestaurant,
	handleLogin,
	deleteRestaurant,
	updateRestaurant,
};
