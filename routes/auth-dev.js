var express = require("express");
const Developer = require("../models/Developer");
var router = express.Router();
const {
	handleNewDeveloper,
	handleLogin,
	deleteDeveloper,
	updateDeveloper,
} = require("../controllers/DeveloperController");

router.get("/api/get", async (req, res, next) => {
	const posts = await Developer.find();
	res.send(posts);
});

router.post("/register", async (req, res, next) => {
	handleNewDeveloper(req, res);
});

router.post("/login", async (req, res, next) => {
	handleLogin(req, res);
});

router.delete("/delete/:id", async (req, res, next) => {
	deleteDeveloper(req, res);
});

router.put("/update/:id", async (req, res, next) => {
	updateDeveloper(req, res);
});

module.exports = router;
