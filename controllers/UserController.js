const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const faker = require("faker");

const handleNewUser = async (req, res) => {
    const { firstname, lastname, address, email, password, phone, referrer } = req.body;

    hashedPassword = await bcrypt.hash(password, 8);
    referrer = await faker.random.alphanumeric(8);
    const newUser = new User({
