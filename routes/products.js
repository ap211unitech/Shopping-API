const router = require("express").Router();
const mongoose = require("mongoose");
const product = require("../config/product")



//End Points of Products.js
router.get("/", async (req, res) => {
    try {
        res.status(200).json({
            message: "All Items You Want",
            totalProducts: await product.find(),
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("<h1>Error Occuring....</h1>")
    }
});

router.get("/:productId", async (req, res) => {
    try {
        res.status(200).json({
            DesiredProduct: await product.find({ _id: req.params.productId })
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message:"Item Not Present"
        })
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
        res.status(500).send("<h1>Could Not Post....</h1>");
    }

})

router.patch("/:productId", (req, res) => {
    res.status(200).json({
        message: `Product PATCHED of ID ${req.params.productId}`
    })
})

router.delete("/:productId", async (req, res) => {
    let id = req.params.productId;
    try {
        let deletedDocument = await product.remove({ _id: id });
        res.status(200).json({
            message: "Item Deleted",
            deletedDocument: deletedDocument
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `No Item present of ID ${id}`
        })
    }
})



//Exporting Router
module.exports = router;