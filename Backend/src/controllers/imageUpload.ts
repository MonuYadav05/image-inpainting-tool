import Image from "../modals/image";
const cloudinary = require("cloudinary").v2;

async function uploadFileToCloudinary(file:any) {
    const options = {
      folder: "images",
      resource_type: "auto",
    };
  
    // console.log("temp file path ", file.tempFilePath);
    return await cloudinary.uploader.upload(file.tempFilePath, options);
  }

  
export const imageUpload = async (req:any, res:any) => {

    try{    
        const file = req.files.imageFile;
        // console.log(file)    
        // upload image to cloudinary
        const uploadedImage = await uploadFileToCloudinary(file);
        // console.log("uploaded image ", uploadedImage);

        // save image to database
        const image =await Image.create({
            name: file.name,
            url: uploadedImage.secure_url,
            createdAt:uploadedImage.created_at,
        });

        res.status(200).json({
            success:"true",
            data:{
                message: "Image uploaded successfully",
                name: image.name,
                url: image.url,
                createdAt:image.createdAt,
                width:uploadedImage.width,
                height:uploadedImage.height,
            }

        });

    }catch(e){  
        res.status(500).json(e);
        console.log("error in uploading image",e)
    }
}