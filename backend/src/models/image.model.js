import mongoose, { Schema } from "mongoose";

const imageSchema = mongoose.Schema(
    {
        image: {
            url: {
                type: String,
                required: true,
            },
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        uploadedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true },
);

export const Image = mongoose.model("Image", imageSchema);
