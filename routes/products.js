const router = require("express").Router();
const mongoose = require("mongoose");
const product = require("../config/product")



//End Points of Products.js
router.get("/", (req, res) => {
    product.find()
        .select("name price _id")
        .exec()
        .then(docs => {
            const response = {
                message: "All items that you want",
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        price: doc.price,
                        request: {
                            type: "GET",
                            url: "http://localhost/products/" + doc._id
                        }
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({
                message: "Can Not Get your request..."
            })
        })
});

router.get("/:productId", async (req, res) => {
    try {
        res.status(200).json({
            message: "Item finded Succeesfully..",
            DesiredProduct: (await product.find({ _id: req.params.productId })).length > 0 ? await product.find({ _id: req.params.productId }).select("name price _id") : `No Item Present of Id: ${req.params.productId}`
        });
    } catch (err) {
        console.log(err);
        res.status(500).json.parse({
            message: "Some Error Occured...."
        });
    }
});



router.post("/", async (req, res) => {
    try {
        const Product = new product({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price
        });
        await Product.save().then(result => {
            let postrequest = {
                message: "Product Created Successfully..",
                _id: result._id,
                name: result.name,
                price: result.price,
                request: {
                    type: "GET",
                    url: "http://localhost/products/" + result._id
                }
            }
            res.status(200).json(postrequest);
        }).catch(err => {
            console.log(err);
            res.status(200).json(err);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json.parse({
            message: "Some Error Occured....Yet not POST"
        });
    }

})

router.patch("/:productId", async (req, res) => {
    let id = req.params.productId;
    try {
        const updatedProduct = await product.update({ _id: id }, { $set: { name: req.body.name, price: req.body.price } });
        res.status(200).json({
            message: `Product of Id: ${id} Updated...`,
            request: {
                type: "GET",
                url: "http://localhost/products/" + id
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json.parse({
            message: "Some Error Occured....Yet Not UPDATED"
        });
    }
})

router.delete("/:productId", async (req, res) => {
    let id = req.params.productId;
    try {
        let document = await product.find({ _id: id });
        let deletedDocument = await product.remove({ _id: id });
        res.status(200).json({
            message: `Item of ID: ${id} Deleted`,
            deletedDocument: {
                _id: id,
                name: document[0].name,
                price: document[0].price
            },
            request: {
                type: "POST",
                url: "http://localhost/products/",
                data: {
                    name: "String",
                    price: "Number"
                }
            }
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `No Such Item of ID: ${req.params.productId}`
        })
    }
})



//Exporting Router
module.exports = router;