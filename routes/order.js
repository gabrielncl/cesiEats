var express = require("express");
var router = express.Router();
const { getOrders, getOrder } = require("../controllers/OrderController");
const { checkJWT } = require("../modules/jwt");

router.get("/", async (req, res) => {
	getOrders(req, res);
});

router.get("/:id", async (req, res) => {
	getOrder(req, res);
}); 

module.exports = router;
