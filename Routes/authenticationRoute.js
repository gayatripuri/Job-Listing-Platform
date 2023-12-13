const express = require("express");
const { login, register ,addJob} = require("../Controllers/authentication");
const isAuthenticated = require('../middleware/auth')


const authRouter = express.Router();
authRouter
  .post("/register", async (req, res) => await register(req, res))
  .post("/login", async (req, res) => await login(req, res))
  .post("/add-job", isAuthenticated, async (req, res) => await addJob(req, res));
  module.exports = authRouter;