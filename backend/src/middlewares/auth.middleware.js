import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/api-error.js";

export const isLoggedIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new ApiError(401, "Unauthorized: No token provided"));
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_ACCESS_TOKEN
    );

    const user = await User.findById(decoded.id).select(
      "-password -forgotPasswordToken -emailVerificationToken"
    );

    if (!user) {
      return next(new ApiError(401, "Invalid access token"));
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(
        new ApiError(401, "Access token expired. Please login again.")
      );
    }

    return next(
      new ApiError(401, error.message || "Unauthorized request")
    );
  }
};

