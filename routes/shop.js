var router = express.Router();
var express = require("express");

router.post("/", async (req, res, next) => {
	handleLogin(req, res);
});

module.exports = router;