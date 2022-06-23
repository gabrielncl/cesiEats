const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deliverySchema = Schema({
    description :{
        type: String,
    },
    order_id: {
        type: Array,
        default:[],
    },
    confirmDelivery:{
        type: Boolean,
    },

	//refreshToken: String,
});

module.exports = mongoose.model("Delivery", deliverySchema);
