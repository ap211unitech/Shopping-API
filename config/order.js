const mongoose = require("mongoose");

const orderschema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
});

const model = mongoose.model('order', orderschema)
module.exports = model;