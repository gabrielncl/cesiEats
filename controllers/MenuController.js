const Menu = require("../models/Menu");


// ARTICLE 
const handleNewMenu = async (req, res) => {
	const { name, description, price, photo, restaurant_id, article_id } = req.body;

	const newMenu = new Menu({
		name,
		description,
		price,
		photo,
		restaurant_id,
		article_id,
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
		.json({ message: "Menu Deleted", data: { status: "success", menu: deletedMenu } });
};

const updateMenu = async (req, res) => {
	const { name, price, photo, description, restaurant_id, article_id } = req.body;
	const menu = await Menu.findByIdAndUpdate(req.params.id, {
		name,
		price,
		photo,
		description,
		restaurant_id,
		article_id,
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