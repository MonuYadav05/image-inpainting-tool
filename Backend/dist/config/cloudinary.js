"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary = require("cloudinary").v2;
const connectCloudinary = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
            api_key: process.env.CLOUDINARY_API_KEY || "",
            api_secret: process.env.CLOUDINARY_API_SECRET || "",
        });
        console.log("connected to cloudinary");
    }
    catch (e) {
        console.error("Cloudinary connection error:", e);
        process.exit(1);
    }
};
exports.default = connectCloudinary;
