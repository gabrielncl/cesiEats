var express = require("express");
const Commercial = require("../models/Commercial");
var router = express.Router();
const handleNewCommercial = require("../controllers/CommercialController");

router.get("/api/get", async (req, res, next) => {
	const posts = await Commercial.find();
	res.send(posts);
});

router.post("/register", async (req, res, next) => {
	handleNewCommercial(req, res);
});

router.put("/register/:id", async (req, res, next) => {
	let id
});

router.delete("/register/:id", async (req, res, next) => {
	let id
});

module.exports = router;
