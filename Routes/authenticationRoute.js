const express = require("express");
const { login, register} = require("../Controllers/authentication");



const authRouter = express.Router();
authRouter
  .post("/register", async (req, res) => await register(req, res))
  .post("/login", async (req, res) => await login(req, res))
  
  module.exports = authRouter;