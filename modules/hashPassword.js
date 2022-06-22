const bcryptjs = require("bcryptjs");

const handlePassword = async (req, res) => {
    password = req.body.password;
    hashed_password = await bcryptjs.hash(password, 8);
    return hashed_password;
}

module.exports = handlePassword;
