import express from "express";
import userController from "../controllers/user.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/reg", userController.userReg)
userRouter.post("/login", userController.userLogin)
userRouter.get("/profile", authMiddleware, userController.getProfile)

export default userRouter;
