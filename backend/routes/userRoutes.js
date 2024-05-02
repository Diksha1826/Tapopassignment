const { RegisterUser } = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.post("/register-user" , RegisterUser );

module.exports = userRouter;