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
    deliveryAddress:{
        type: String,
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
    },
})
module.exports = mongoose.model('Order', orderSchema)