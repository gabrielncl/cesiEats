const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = Schema({
    user_id: {
        type: String,
        required: true
    },
    description: {
		type: String,
	},
    totalprice:{
        type: Number,
        required: true
    },
    deliveryAdress:{
        type: String,
        required: true
    },
    article_id: {
        type: Array,
        default:[],
    },
    menu_id: {
		type: Array,
        default:[],
	},
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
})
module.exports = mongoose.model('Order', orderSchema)