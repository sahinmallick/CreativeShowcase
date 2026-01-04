import mongoose from "mongoose";
import { Image } from "../models/image.model.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

export const uploadImage = async (req, res) => {
    const { title, description } = req.body;

    if (!title || !req.file) {
        throw new ApiError(401, "Please upload the image and give a title!");
    }
    try {
        const cloudinaryResult = await uploadToCloudinary(
            req.file.buffer,
            "creative-showcase-images",
        );

        const image = await Image.create({
            image: {
                url: cloudinaryResult.secure_url,
            },
            title,
            description,
            uploadedBy: new mongoose.Types.ObjectId(req.user._id),
        });

        return res
            .status(200)
            .json(new ApiResponse(200, image, "Image uploaded succesfully!"));
    } catch (error) {
        console.log(`Error while uploading image ${error}`);
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const getImage = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(401, "Invalid link!");
    }

    try {
        const image = await Image.findById(id);
        if (!image) {
            throw new ApiError(401, "No image found!");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, "Image fetched succesfully!", image));
    } catch (error) {
        console.log(`Error while fetching image ${error}`);
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const getImages = async (req, res) => {
    try {
        const images = await Image.find().populate({
            path: "uploadedBy",
            select: "fullname username email avatar",
        });
        if (!images) {
            throw new ApiError(401, "No images found!");
        }
        return res
            .status(200)
            .json(new ApiResponse(200, "Images fetched succesfully!", images));
    } catch (error) {
        console.log(`Error while fetching images ${error}`);
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const userImages = async (req, res, next) => {
    try {
        const userId = req.user?._id;

        if (!userId) {
            return next(new ApiError(401, "Unauthorized request"));
        }
        const images = await Image.find({ uploadedBy: userId })
            .populate("uploadedBy", "fullname username email avatar")
            .sort({ createdAt: -1 });

        if (images.length === 0) {
            return res
                .status(200)
                .json(new ApiResponse(200, "No images found", []));
        }
        return res
            .status(200)
            .json(new ApiResponse(200, "Images fetched succesfully!", images));
    } catch (error) {
        console.log(`Error while fetching images ${error}`);
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const deleteImage = async (req, res) => {
    try {
        const { id } = req.params;

        await Image.findByIdAndDelete(id);

        return res
            .status(200)
            .json(new ApiResponse(200, "Image deleted succesfully!"));
    } catch (error) {
        console.log(`Error while deleting images ${error}`);
        return res.status(500).json({
            message: error.message,
        });
    }
};
