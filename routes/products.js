const router = require("express").Router();





router.get("/",(req,res)=>{
    res.status(200).json({
        message:"It's products page"
    })
})



//Exporting Router
module.exports = router;