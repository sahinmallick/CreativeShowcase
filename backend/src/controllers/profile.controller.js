import { Image } from "../models/image.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

export const profile = async (req, res) => {
    const { username } = req.params;

    if (!username) {
        throw new ApiError(401, "Invalid username!");
    }

    try {
        const user = await User.findOne({username}).select(
            "-password -refreshToken -__v",
        );

        if (!user) {
            return res.status(404).json(
            new ApiResponse(404, "User not found!"))
        }


        const images = await Image.find({
            uploadedBy: user._id,
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
