var express = require("express");
const Commercial = require("../models/Commercial");
var router = express.Router();
const {
	handleNewCommercial,
	handleLogin,
	deleteCommercial,
	updateCommercial,
} = require("../controllers/CommercialController");


router.get("/api/get", async (req, res, next) => {
	const posts = await Commercial.find();
	res.send(posts);
});

router.post("/login", async (req, res, next) => {
	handleLogin(req, res);
});

router.post("/register", async (req, res, next) => {
	handleNewCommercial(req, res);
});

router.delete("/delete/:id", async (req, res, next) => {
	deleteCommercial(req, res);
});

router.put("/update/:id", async (req, res, next) => {
	updateCommercial(req, res);
});

module.exports = router;
