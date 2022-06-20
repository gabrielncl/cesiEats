const jwt = require("jsonwebtoken");

const token = (user) => jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
});

module.exports = token