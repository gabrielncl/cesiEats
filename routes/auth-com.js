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

// Creating a DELETE request
router.delete('/register/:_id', (req, res) => {
	let _id
	console.log("DELETE Request Called for /api endpoint")
	res.send("DELETE Request Called")
 })

module.exports = router;
