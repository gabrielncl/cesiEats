var express = require("express");
var router = express.Router();

const { checkJWT } = require("../modules/jwt");
const {
	handleNewDeliverer,
	handleLogin,
	deleteDeliverer,
} = require("../controllers/DelivererController");

const {
	getAvailableOrders,
	chooseOrderToDeliver,
	delivered,
} = require("../controllers/OrderController");

router.post("/login", async (req, res, next) => {
	handleLogin(req, res);
});

router.post("/register", async (req, res, next) => {
	handleNewDeliverer(req, res);
});

router.delete("/delete/:id", async (req, res, next) => {
	deleteDeliverer(req, res);
});

router.get("/available-orders", async (req, res, next) => {
	getAvailableOrders(req, res);
});

router.put("/accept-order/:id", async (req, res, next) => {
	chooseOrderToDeliver(req, res);
});

router.put("/deliver-order/:id", async (req, res, next) => {
	delivered(req, res);
});

module.exports = router;
