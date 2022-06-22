const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = Schema({
    whichuser: {
        type: String,
    },
    article: {
        type  :Array,
        default:[]
    },
    totalprice:{
        type:Number,
        default:0
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
})
module.exports = mongoose.model('cart',cartSchema)