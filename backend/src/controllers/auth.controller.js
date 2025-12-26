import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { emailVerificationMailGenContent, sendMail } from "../utils/mail.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { fullname, email, phone, username, password, bio } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new ApiError(400, "User already exists!");
        }

        const token = crypto.randomBytes(32).toString("hex");
        const tokenExpiry = Date.now() + 30 * 60 * 1000;

        const cloudinaryResult = await uploadToCloudinary(
            req.file.buffer,
            "creative-showcase",
        );

        const user = await User.create({
            fullname,
            username,
            email,
            avatar: {
                url: cloudinaryResult.secure_url,
            },
            bio,
            phone,
            password,
            emailVerificationToken: token,
            emailVerificationExpires: tokenExpiry,
        });

        const verificationUrl = `${process.env.URL}/api/v1/auth/verify-user/${token}`;

        await sendMail({
            email,
            subject: "Verify your account",
            mailGenContent: emailVerificationMailGenContent(
                username,
                verificationUrl,
            ),
        });

        return res
            .status(201)
            .status(201)
            .json(new ApiResponse(201, "User Created!", { user }));
    } catch (error) {
        console.error("REGISTER ERROR STACK:\n", error.stack);
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const verifyUser = async (req, res) => {
    const { token } = req.params;

    try {
        if (!token) {
            throw new ApiError(400, "Invalid/Empty link");
        }

        const user = await User.findOne({
            emailVerificationToken: token,
            emailVerificationExpires: { $gt: Date.now() },
        });

        if (!user) {
            throw new ApiError(
                400,
                "Verification link is invalid or has expired!",
            );
        }

        if (user.isVerified) {
            throw new ApiError(400, "User is already verified!");
        }

        ((user.isVerified = true),
            (user.emailVerificationToken = null),
            (user.emailVerificationExpires = null));

        await user.save();

        return res
            .status(200)
            .json(new ApiResponse(200, "User verified succesfully!"));
    } catch (error) {
        console.log(`Error in verify user! ${error}`);
        new ApiError(500, `Error in verify user!`);
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).select(
            "-password -emailVerificationToken -emailVerificationExpires",
        );

        if (!user) {
            throw new ApiError(400, "No user exists!");
        }

        if (!user.isVerified) {
            throw new ApiError(
                400,
                "Please verify your account first to log in!",
            );
        }

        const accessToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET_ACCESS_TOKEN,
            { expiresIn: "30d" },
        );

        const cookieOptionsAccessToken = {
            httpOnly: true,
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        };

        res.cookie("accessToken", accessToken, cookieOptionsAccessToken);

        return res.status(200).json(
            new ApiResponse(200, "User logged in successfully!", {
                user,
            }),
        );
    } catch (error) {
        console.log(`Error while logging in user! ${error}`);
        new ApiError(500, `Error while logging in user`);
    }
};

export const logoutUser = async (req, res) => {
    const { accessToken } = req.cookies;
    if (!accessToken) throw new ApiError(400, "No access token found!");

    try {
        const user = await User.findOne({ accessToken: accessToken });
        if (user) {
            user.accessToken = null;
            await user.save();
        }

        res.clearCookie("accessToken")
            .status(200)
            .json(new ApiResponse(200, "User logged out succesfully!"));
    } catch (error) {
        console.log(`Error while logging in user! ${error}`);
        new ApiError(500, `Error while logging in user!`);
    }
};

export const resendEmailVerification = async (req, res) => {
    const { email } = req.body;
    if (!email) throw new ApiError(400, "Please enter your email!");

    try {
        const user = await User.findOne({ email });
        if (!user) throw new ApiError(400, "No user found!");

        if (user.isVerified) throw new ApiError(400, "User already verified!");

        const token = crypto.randomBytes(32).toString("hex");
        const tokenExpiry = Date.now() + 30 * 60 * 1000;

        user.emailVerificationToken = token;
        user.emailVerificationExpires = tokenExpiry;
        await user.save();

        const verificationUrl = `${process.env.URL}/api/v1/user/verify-user/${token}`;

        await sendMail({
            email,
            subject: "Verify your account",
            mailGenContent: emailVerificationMailGenContent(
                username,
                verificationUrl,
            ),
        });

        return res
            .status(200)
            .json(
                new ApiResponse(201, "Verification email sent successfully!"),
            );
    } catch (error) {
        console.log(`Error while re-sending email verification! ${error}`);
        new ApiError(500, `Error while re-sending email verification!`);
    }
};

export const forgotPasswordRequest = async (req, res) => {
    const { email } = req.body;

    if (!email) throw new ApiError(400, "Email is required!");

    try {
        const user = await User.findOne({ email });

        if (!user) throw new ApiError(400, "User does not exists!");

        const token = crypto.randomBytes(32).toString("hex");
        const tokenExpiry = Date.now() + 30 * 60 * 1000;

        const resetPasswordUrl = `${process.env.URL}/api/v1/user/reset-password/${token}`;

        user.forgotPasswordToken = token;
        user.forgotPasswordExpires = tokenExpiry;
        await user.save();

        await sendMail({
            email,
            subject,
            mailGenContent: forgotPasswordMailGenContent(
                username,
                resetPasswordUrl,
            ),
        });

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    "Password reset link is sent to the email!",
                ),
            );
    } catch (error) {
        console.log(`Error while sending forgot password request! ${error}`);
        new ApiError(500, `Error while sending forgot password request!`);
    }
};

export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    if (!token) throw new ApiError(400, "Invalid/Expired Link!");

    try {
        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            throw new ApiError(
                400,
                "Reset password link is invalid or has expired!",
            );
        }

        user.password = password;
        user.forgotPasswordToken = null;
        user.forgotPasswordExpires = null;

        await user.save();

        res.status(200).json(
            new ApiResponse(200, "Password has been reset successfully!"),
        );
    } catch (error) {
        console.log(`Error while sending forgot password request! ${error}`);
        ApiError(500, `Error while sending forgot password request!`);
    }
};

export const changeCurrentPassword = async (req, res) => {
    const { id } = req.user;
    const { oldPassword, newPassword } = req.body;

    try {
        const user = await User.findById(id);

        if (!user) throw new ApiError(400, "Please log in first!");

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) throw new ApiError(400, "Wrong password!");

        user.password = newPassword;
        await user.save();

        res.status(200).json(
            new ApiResponse(200, "Password changed successfully!"),
        );
    } catch (error) {
        console.log(`Error while changing current password! ${error}`);
        new ApiError(500, `Error while changing current password!`);
    }
};

export const getCurrentUser = async (req, res) => {
    const { id } = req.user;

    try {
        const user = await User.findById(id).select(
            "-password -forgotPasswordToken -forgotPasswordExpires",
        );

        if (!user) throw new ApiError(404, "User not found!");

        res.status(200).json(
            new ApiResponse(200, "Current user fetched successfully!", {
                user,
            }),
        );
    } catch (error) {
        console.log(`Error while fetching current user! ${error}`);
        new ApiError(500, `Error while fetching current user!`);
    }
};
