import { Image } from "../models/image.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

export const profile = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(401, "Invalid link!");
    }

    try {
        const user = await User.findById(id).select(
            "-password -refreshToken -__v",
        );

        if (!user) {
            throw new ApiError(404, "User not found!");
        }

        const images = await Image.find({
            uploadedBy: id,
        })
            .sort({ createdAt: -1 })
            .select("title description image createdAt");

        return res.status(200).json(
            new ApiResponse(200, "User profile fetched successfully!", {
                user,
                images,
            }),
        );
    } catch (error) {
        console.log(`Error while fetching user profile ${error}`);
        return res.status(500).json({
            message: error.message,
        });
    }
};
