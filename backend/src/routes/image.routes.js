import express from "express";
import upload from "../middlewares/multer.middleware.js";
import {
    deleteImage,
    getImage,
    getImages,
    uploadImage,
    userImages,
} from "../controllers/image.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const imageRouter = express.Router();

imageRouter.post(
    "/upload-image",
    isLoggedIn,
    upload.single("image"),
    uploadImage,
);
imageRouter.get("/get-image/:id", getImage);
imageRouter.get("/get-images", getImages);
imageRouter.get("/user-images", isLoggedIn, userImages);
imageRouter.delete("/delete-image/:id", isLoggedIn, deleteImage);

export default imageRouter;
