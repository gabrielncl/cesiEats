const jwt = require("jsonwebtoken");

const token = (user) =>
	jwt.sign({ user: user }, process.env.JWT_SECRET, {
		expiresIn: "1h",
	});

function createCookie(jwtToken) {
	res.cookie("token", jwtToken, {
		httpOnly: true,
	});
}

module.exports = { token, createCookie };

module.exports = token;