const router = require("express").Router();




//End Points of orders.js
router.get("/", (req, res) => {
    res.status(200).json({
        message: "Order's GET page"
    })
})

router.post("/", (req, res) => {
    const order = {
        name: req.body.name,
        quantity: req.body.quantity
    }
    res.status(200).json({
        message: "Order's POST page",
        order: order
    })
})

router.get("/:productId", (req, res) => {
    res.status(200).json({
        message: `Order of ID ${req.params.productId} `
    })
})

router.delete("/:productId", (req, res) => {
    res.status(200).json({
        message: `Order DELETED of ID ${req.params.productId}`
    })
})



//Exporting Router
module.exports = router;