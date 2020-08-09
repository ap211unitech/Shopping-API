const router = require("express").Router();
const mongoose = require("mongoose");
const orderModel = require("../config/order");
const productModel = require("../config/product");



//End Points of orders.js
router.get("/", (req, res) => {
    orderModel.find()
        .select("product quantity _id")
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Your all orders..",
                count: result.length,
                orders: result.map(docs => {
                    return {
                        _id: docs._id,
                        product: docs.product,
                        quantity: docs.quantity,
                        request: {
                            type: "GET",
                            url: "http://localhost/orders/" + docs._id
                        },
                        productDetails: {
                            type: "GET",
                            url: "http://localhost/products/" + docs.product
                        }
                    }
                })
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Could not get your orders..."
            })
        })
})


router.get("/:orderId", (req, res) => {
    orderModel.findById(req.params.orderId)
        .select("_id product quantity")
        .exec()
        .then(result => {
            res.status(200).json({
                message: `Order of ID: ${req.params.orderId}`,
                Order: {
                    _id: result._id,
                    productId: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: "GET",
                    url: "http://localhost/orders/"
                },
                productDetails: {
                    type: "GET",
                    url: "http://localhost/products/" + result.product
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Some Error Occured...",
                error: err
            });
        });
});



router.post("/", (req, res) => {
    console.log(req.body)
    productModel.findById(req.body.product)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }
            const order = new orderModel({
                _id: mongoose.Types.ObjectId(),
                product: req.body.product,
                quantity: req.body.quantity
            });
            return order.save();
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Order stored",
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: "GET",
                    url: "http://localhost/orders/" + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});



router.delete("/:orderId", (req, res) => {
    orderModel.remove({ _id: req.params.orderId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Order deleted",
                request: {
                    type: "POST",
                    url: "http://localhost:3000/orders",
                    data: { product: "ID", quantity: "Number" }
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
})



//Exporting Router
module.exports = router;
