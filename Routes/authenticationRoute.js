const express = require("express");
const { login, register, logout} = require("../Controllers/authentication");



const authRouter = express.Router();
authRouter
 // .post("/register", async (req, res) => await register(req, res))

 .post("/register", async (req, res) => {
  // Call the register function
  const registerResponse = await register(req, res);

  // If registration is successful, call the login function
  if (registerResponse && registerResponse.success) {
    await login(req, res);
  }
})
  .post("/login", async (req, res) => await login(req, res))
  .post("/logout", async(req, res) => await logout(req, res))
  module.exports = authRouter;