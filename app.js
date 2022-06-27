var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");

var usersRouter = require("./routes/auth-user");
var devsRouter = require("./routes/auth-dev");
var techsRouter = require("./routes/auth-tech");
var commercialsRouter = require("./routes/auth-com");
var deliverersRouter = require("./routes/auth-deliverer");
var restaurantsRouter = require("./routes/auth-restaurant");
var ordersRouter = require("./routes/order");
var shop = require("./routes/shop");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/devs", devsRouter);
app.use("/techs", techsRouter);
app.use("/commercials", commercialsRouter);
app.use("/deliv", deliverersRouter);
app.use("/restaurants", restaurantsRouter);
app.use("/orders", ordersRouter);
app.use('/shop', shop);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// database handler
const uri =
	"mongodb+srv://cesieats_groupe3:5ABgeMoZ6XMRJDS6@cluster0.lezhpzm.mongodb.net";
mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		dbName: "cesieats",
	})
	.then(() => console.log("Connexion à MongoDB réussie !"))
	.catch(() => console.log("Connexion à MongoDB échouée !"));

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
