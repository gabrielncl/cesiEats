var express = require("express");
var router = express.Router();
const {
	handleNewDeveloper,
	handleLogin,
	deleteDeveloper,
	updateDeveloper,
} = require("../controllers/DeveloperController");

const { checkJWT } = require("../modules/jwt");

const {
	handleNewUser,
	deleteUser,
	updateUser,
} = require("../controllers/UserController");

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

router.post("/user/register", async (req, res, next) => {
	handleNewUser(req, res);
});

router.delete("/user/delete/:id", checkJWT, async (req, res, next) => {
	deleteUser(req, res);
});

router.put("/user/update/:id", checkJWT, async (req, res, next) => {
	updateUser(req, res);
});

module.exports = router;
