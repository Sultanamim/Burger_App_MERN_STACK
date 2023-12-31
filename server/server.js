// Should Install these Packages for complete backend => (dotenv, express, morgan, mongoose, bcryptjs, jsonwebtoken, joi, lodash, cors)..

const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_SERVER)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.log("MongoDB connection failed!"));

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
