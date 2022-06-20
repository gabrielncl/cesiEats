const Commercial = require("../models/Commercial");
const handlePassword = require("../modules/hashPassword");
const bcrypt = require("bcrypt");

const handleNewCommercial = async (req, res) => {
	const { email } =
		req.body;

	const newCommercial = new Commercial({
		email,
		password: await handlePassword(req, res),
	});

	await newCommercial.save();
	res.status(200).json({
		message: "User Created",
		data: { status: "success", com: newCommercial},
	});
};

const handleLogin = async(req,res) => {
	const { email, password} = req.body;
	const com = await Commercial.findOne({ email: email})
	if (!com){
		res.status(401).send("Invalid email or password");
	}else{
		const isValidPassword = await bcrypt.compare(password, com.password);
		if (!isValidPassword) {
			res.status(401).send("Invalid email or password");
		} else {
			const jwtToken = token(com);
			res.status(200).json({
				message: "User Logged",
				data: { status: "success", cpm: com, token: jwtToken },
			});
		}
	}
};

const deleteCommercial = async (req, res) => {
	const deletedCom = await Commercial.findByIdAndDelete(req.params.id);
	res
		.status(200)
		.json({ message: "Commercial Deleted", data: { status: "success", com: deletedCom} });
};

const updateCommercial = async (req, res) => {
	const { email } = req.body;
	const com = await Commercial.findByIdAndUpdate(req.params.id, {
		email,
		password: await handlePassword(req, res),
	});
	res
		.status(200)
		.json({ message: "Commercial Updated", data: { status: "success", com: com } });
};


module.exports = {
	handleNewCommercial,
	handleLogin,
	deleteCommercial,
	updateCommercial,
};
