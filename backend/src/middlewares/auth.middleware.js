import { User } from "../models/user.model";


export const isLoggedIn = async (req, res) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) throw new ApiError(400, "Unauthorized request!")

        const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS_TOKEN)

        const user = await User.findById(decoded?.accessToken._id).select("-password -refressToken -forgotPasswordToken -emailVerificationToken")

        if (!user) {
            throw new ApiError(401, "Invalid Access Token!");
        }

        req.user = user;
        next()

    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw new ApiError(401, "Access token expired! Please login again.");
        }
        throw new ApiError(401, error?.message || "Invalid access token!");
    }
}