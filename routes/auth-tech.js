var express = require("express");
const Technician = require("../models/Technician");
var router = express.Router();

const {
	handleNewTechnician,
	handleLogin,
	deleteTechnician,
	updateTechnician,
} = require("../controllers/TechnicianController");

router.get("/api/get", async (req, res, next) => {
	const posts = await Technician.find();
	res.send(posts);
});

router.post("/login", async (req, res, next) => {
	handleLogin(req, res);
});

router.post("/register", async (req, res, next) => {
	handleNewTechnician(req, res);
});

router.delete("/delete/:id", async (req, res, next) => {
	deleteTechnician(req, res);
});

router.put("/update/:id", async (req, res, next) => {
	updateTechnician(req, res);
});

module.exports = router;
