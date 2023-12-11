const express = require("express");
const { login, register } = require("../Controllers/authentication");

const authRouter = express.Router();

authRouter
  .post("/register", register)
  .post("/login", login);

module.exports = authRouter;
