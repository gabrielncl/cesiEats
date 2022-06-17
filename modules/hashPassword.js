const bcrypt = require("bcrypt");

const handlePassword = async (req, res) => {
    password = req.body.password;
    hashed_password = await bcrypt.hash(password, 8);
    return hashed_password;
}

module.exports = handlePassword;
