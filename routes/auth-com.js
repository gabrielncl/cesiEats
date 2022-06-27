var express = require("express");
var router = express.Router();
const {
	handleNewCommercial,
	handleLogin,
	deleteCommercial,
	updateCommercial,
} = require("../controllers/CommercialController");

const { checkJWT } = require("../modules/jwt");

const {
	handleNewUser,
	deleteUser,
	updateUser,
} = require("../controllers/UserController");

const { getAllOrders } = require("../controllers/OrderController");

router.post("/login", async (req, res, next) => {
	handleLogin(req, res);
});

router.post("/register", async (req, res, next) => {
	handleNewCommercial(req, res);
});

router.delete("/delete/:id", checkJWT, async (req, res, next) => {
	deleteCommercial(req, res);
});

router.put("/update/:id", checkJWT, async (req, res, next) => {
	updateCommercial(req, res);
});

router.post("/user/register", async (req, res, next) => {
	handleNewUser(req, res);
});

router.delete("/user/delete/:id", checkJWT, async (req, res, next) => {
	deleteUser(req, res);
});

router.put("/user/update/:id", checkJWT, async (req, res, next) => {
	updateUser(req, res);
});

router.get("/orders", checkJWT, async (req, res, next) => {
	getAllOrders(req, res);
});

module.exports = router;
