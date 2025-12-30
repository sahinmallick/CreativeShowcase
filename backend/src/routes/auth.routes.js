import express from "express";
import {
    changeCurrentPassword,
    getCurrentUser,
    loginUser,
    logoutUser,
    register,
    resetPassword,
    verifyUser,
} from "../controllers/auth.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import {
    changePasswordValidator,
    userLoginValidator,
    userRegistrationValidator,
} from "../validators/index.js";
import validator from "../middlewares/validator.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const authRouter = express.Router();

authRouter.post(
    "/register",
    upload.single("avatar"),
    userRegistrationValidator(),
    validator,
    register,
);
authRouter.get("/verify-user/:token", verifyUser);
authRouter.post("/login", userLoginValidator(), validator, loginUser);
authRouter.get("/logout", isLoggedIn, logoutUser);
authRouter.post("/reset-password/:token", resetPassword);
authRouter.post(
    "/change-password",
    isLoggedIn,
    changePasswordValidator(),
    validator,
    changeCurrentPassword,
);
authRouter.get("/me", isLoggedIn, getCurrentUser);

export default authRouter;
