const jwt = require("jsonwebtoken");

const createJWT = (user) =>
	jwt.sign({ user: user }, process.env.JWT_SECRET, {
		expiresIn: "1h",
	});

const checkJWT = (req, res, next) => {
	if (!req.headers["authorization"]) {
		token = req.cookies.token;
	} else {
		token = req.headers["authorization"].substring(
			7,
			req.headers["authorization"].length
		);
	}
	jwt.verify(token, process.env.JWT_SECRET, (err) => {
		if (err) {
			res.status(401).send("Invalid token").redirect("/login");
		} else {
			return next();
		}
	});
};
const returnUserFromJwt = (req, res) => {
	if (!req.headers["authorization"]) {
		token = req.cookies.token;
	} else {
		token = req.headers["authorization"].substring(
			7,
			req.headers["authorization"].length
		);
	}
	const user = jwt.verify(token, process.env.JWT_SECRET);
	jwt.verify(token, process.env.JWT_SECRET, (err) => {
		if (err) {
			res.status(401).send("Invalid token");
		} else {
			user_id = user.user._id;
		}
	});
	return user_id;
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

module.exports = { createJWT, createCookie, checkJWT, returnUserFromJwt };
