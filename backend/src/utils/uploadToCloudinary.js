import cloudinary from "../../config/cloudinary.js";

const uploadToCloudinary = (buffer, folder = "uploads") => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream({ folder }, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            })
            .end(buffer);
    });
};

export default uploadToCloudinary;
