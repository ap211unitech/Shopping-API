const router = require("express").Router();




//End Points of Products.js
router.get("/",(req,res)=>{
    res.status(200).json({
        message:"Product's GET page"
    })
})

router.post("/",(req,res)=>{
    res.status(200).json({
        message:"Product's POST page"
    })
})

router.patch("/:productId",(req,res)=>{
    res.status(200).json({
        message:`Product PATCHED of ID ${req.params.productId} `
    })
})

router.delete("/:productId",(req,res)=>{
    res.status(200).json({
        message:`Product DELETED of ID ${req.params.productId}`
    })
})



//Exporting Router
module.exports = router;