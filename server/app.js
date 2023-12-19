const express = require("express");
const cors = require("cors"); // Cors Origin Resource Sharing
const app = express();
const userRouter = require("./routers/userRouter");
const orderRouter = require("./routers/orderRouter");

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/order", orderRouter);

module.exports = app;
