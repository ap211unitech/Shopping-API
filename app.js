require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const bodyparser = require("body-parser");
const connection = require("./config/connection");
const product = require("./config/product");
const order = require("./config/order");


//MiddleWare
app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//End points
app.use("/products", require("./routes/products"));
app.use("/orders", require("./routes/orders"));
app.all("*", (req, res) => {
    res.status(404).send(`<h1>Error Page....</h1>`);
})


//Listening Point
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
})
