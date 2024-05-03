const { RegisterUser, LoginUser } = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.post("/register-user", RegisterUser);
userRouter.post("/login-user", LoginUser);

module.exports = userRouter;
