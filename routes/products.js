const router = require("express").Router();
const mongoose = require("mongoose");
const product = require("../config/product")



//End Points of Products.js
router.get("/", async (req, res) => {
    try {
        res.status(200).json({
            message: "All Items You Want",
            totalProducts: (await product.find()).length > 0 ? await product.find() : "No Items Present",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json.parse({
            message: "Some Error Occured...."
        });
    }
});

router.get("/:productId", async (req, res) => {
    try {
        res.status(200).json({
            message: "Item finded Succeesfully..",
            DesiredProduct: (await product.find({ _id: req.params.productId })).length > 0 ? await product.find({ _id: req.params.productId }) : `No Item Present of Id: ${req.params.productId}`
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
            console.log(result);
            res.status(200).json(result);
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
        console.log(await product.find({ _id: id }));
        res.status(200).json({
            message: `Product of Id: ${id} Updated...`,
            updatedProduct: await product.find({ _id: id })
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
            deletedDocument: document
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