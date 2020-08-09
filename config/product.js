const mongoose = require("mongoose");
const { get } = require("../routes/orders");

const productschema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const model = mongoose.model('product', productschema);

module.exports = model;