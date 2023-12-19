const express = require("express");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const { User, validate } = require("../models/user");

const router = express.Router();

const newUser = async (req, res) => {
  //STEP: 1=> Validate coming user(req.body) with Joi validation
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //STEP: 2=> After Successful Validation Checking the user existing
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered!");

  //STEP: 3=> If user dosen't exist so create a new User with coming user(req.body)
  user = new User(_.pick(req.body, ["email", "password"]));

  //STEP: 4=> Let's replace user password with Hash password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  //STEP: 5=> Generate a token for this new User
  const token = user.generateJWT();

  //STEP: 6=> Get the New user and save to database
  const result = await user.save();
  return res.status(201).send({
    status: "Created a new User Successfully!",
    token: token,
    user: _.pick(result, ["_id", "email"]),
  });
};

const authUser = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password!");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid email or password!");

  const token = user.generateJWT();
  res.send({
    status: "Loged In Successfully!",
    token: token,
    user: _.pick(user, ["_id", "email"]),
  });
};

router.route("/").post(newUser);

router.route("/auth").post(authUser);

module.exports = router;
