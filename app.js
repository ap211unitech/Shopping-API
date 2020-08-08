require("dotenv").config();
const express = require("express");
const app = express();


//End points
app.use("/products", require("./routes/products"));
app.get("*", (req, res) => {
    res.status(200).send(`<h1>This page handles Error....</h1>`)
})


//Listening Point
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})