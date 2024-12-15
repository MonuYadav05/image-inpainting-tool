"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageUpload = void 0;
const image_1 = __importDefault(require("../modals/image"));
const cloudinary = require("cloudinary").v2;
function uploadFileToCloudinary(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            folder: "images",
            resource_type: "auto",
        };
        // console.log("temp file path ", file.tempFilePath);
        return yield cloudinary.uploader.upload(file.tempFilePath, options);
    });
}
const imageUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.files.imageFile;
        // console.log(file)    
        // upload image to cloudinary
        const uploadedImage = yield uploadFileToCloudinary(file);
        // console.log("uploaded image ", uploadedImage);
        // save image to database
        const image = yield image_1.default.create({
            name: file.name,
            url: uploadedImage.secure_url,
            createdAt: uploadedImage.created_at,
        });
        res.status(200).json({
            success: "true",
            data: {
                message: "Image uploaded successfully",
                name: image.name,
                url: image.url,
                createdAt: image.createdAt,
                width: uploadedImage.width,
                height: uploadedImage.height,
            }
        });
    }
    catch (e) {
        res.status(500).json(e);
        console.log("error in uploading image", e);
    }
});
exports.imageUpload = imageUpload;
