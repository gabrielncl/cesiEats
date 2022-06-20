const jwt = require("jsonwebtoken");

const token = (user) => jwt.sign({ user: user }, process.env.JWT_SECRET, {
    expiresIn: "1h",
});

module.exports = token