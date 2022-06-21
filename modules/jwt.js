const jwt = require("jsonwebtoken");

const createJWT = (user) =>
	jwt.sign({ user: user }, process.env.JWT_SECRET, {
		expiresIn: "1h",
	});

const checkJWT = (req, res, next) => {
	const token = req.cookies.token;
	jwt.verify(token, process.env.JWT_SECRET, (err) => {
		if (err) {
			res.status(401).send("Invalid token");
		} else {
			return next();
		}
	});
};

const createCookie = (token) => async (req, res) => {
	res.cookie("token", token, {
		httpOnly: true,
	});
};

/*const createCookie = (token) => async (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	if (token == null) return res.sendStatus(401);
	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) return res.sendStatus(403);
		req.user = user;
		next();
	});
};*/

module.exports = { createJWT, createCookie, checkJWT };
