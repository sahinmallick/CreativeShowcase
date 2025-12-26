import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = mongoose.Schema(
    {
        avatar: {
            url: {
                type: String,
                default: "https://avatar.iran.liara.run/public/boy",
            },
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
        },
        username: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        bio: {
            type: String,
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
            required: true,
        },
        password: {
            type: String,
            required: [true, "Password is required!"],
        },
        role: {
            type: String,
            enum: ["ARTIST", "ADMIN", "ORGANIZATION"],
            default: "ARTIST",
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        forgotPasswordToken: {
            type: String,
        },
        forgotPasswordExpires: {
            type: Date,
        },
        emailVerificationToken: {
            type: String,
        },
        emailVerificationExpires: {
            type: Date,
        },
    },
    { timestamps: true },
);

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        { _id: this._id, username: this.userSchema, email: this.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRY },
    );
};

userSchema.methods.generateTemporaryToken = async function () {
    const unHashedToken = crypto.randomBytes(20).toString("hex");
    const hashedToken = crypto
        .createHash("sha256")
        .update(unHashedToken)
        .digest("hex");
    const tokenExpiry = Date.now() + 20 * 60 * 1000;

    return { unHashedToken, hashedToken, tokenExpiry };
};

export const User = mongoose.model("User", userSchema);
