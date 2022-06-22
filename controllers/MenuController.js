const Menu = require("../models/Menu");


// ARTICLE 
const handleNewMenu = async (req, res) => {
	const { name, description, price, photo, restaurantName, articleName } = req.body;

	const newMenu = new Menu({
		name,
		description,
		price,
		photo,
		restaurantName,
		articleName,
	});

	await newMenu.save();
	res.status(200).json({
		message: "Menu Created",
		data: { status: "success", menu: newMenu },
	});
};

const deleteMenu = async (req, res) => {
	const deletedMenu = await Menu.findByIdAndDelete(req.params.id);
	res
		.status(200)
		.json({ message: "Menu Deleted", data: { status: "success", menu: deleteMenu } });
};

const updateMenu = async (req, res) => {
	const { name, price, photo, description, restaurantName, articleName } = req.body;
	const menu = await Menu.findByIdAndUpdate(req.params.id, {
		name,
		price,
		photo,
		description,
		restaurantName,
		articleName,
	});
	res
		.status(200)
		.json({ message: "Menu Updated", data: { status: "success", menu: menu } });
};

module.exports = {
    handleNewMenu,
    updateMenu,
    deleteMenu
};