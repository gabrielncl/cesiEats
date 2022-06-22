const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = Schema({
    wichuser: {
        type: String,
    },
    article: {
        type: Array,
        default:[]
    },
    totalprice:{
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})
module.exports = mongoose.model('Order', orderSchema)