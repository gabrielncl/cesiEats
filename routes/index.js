var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

const uri =
	"mongodb+srv://cesieats_groupe3:5ABgeMoZ6XMRJDS6@cluster0.lezhpzm.mongodb.net";
mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		dbName: "cesieats",
	})
	.then(() => console.log("Connexion à MongoDB Commune réussie !"))
	.catch(() => console.log("Connexion à MongoDB Commune échouée !"));

module.exports = router;
