const express = require("express");
const route = express.Router();
const { signUp, signIn } = require("../controllers/auth");

route.route("/").post(signIn);
route.route("/signup").post(signUp);

module.exports = route;
