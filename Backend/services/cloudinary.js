const cloudinary = require('cloudinary').v2;
require("dotenv").config();
const fs = require('fs');

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
});

const uploadImage = async (localFilePath, folder, username) => {
    try {
      if (!localFilePath || !username) return null;
      const publicId = `${folder}/${username}_profile_pic`;
      // Check if an old image with the same name exists
      const existingImage = await cloudinary.api.resource(publicId).catch(() => null);
      // Delete the old image if it exists
      if (existingImage) {
        await cloudinary.uploader.destroy(publicId);
      }
      const response = await cloudinary.uploader.upload(localFilePath, {
        public_id: publicId, // Set unique public ID
        folder,             // Folder to store the image
      });
      fs.unlinkSync(localFilePath);
      return response;
    } catch (error) {
      console.error("Error during image upload:", error);
      fs.unlinkSync(localFilePath);
      return null;
    }
  };
  



module.exports = { uploadImage }
