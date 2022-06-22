const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = Schema({
    user_id: {
        type: Number,
    },
    article_id: {
        type  :Array,
        default:[]
    },
    menu_id: {
        type  :Array,
        default:[]
    },
    totalprice:{
        type:Number,
        required: true,
    },

})
module.exports = mongoose.model('cart',cartSchema)