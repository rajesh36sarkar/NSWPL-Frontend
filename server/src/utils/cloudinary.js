// src/utils/cloudinary.js
import { v2 as cloudinary } from "cloudinary";

/**
 * Delete an image from Cloudinary by public_id
 * @param {string} publicId - The public_id of the image to delete
 * @returns {Promise} - Cloudinary API response
 */
export const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) {
      console.warn("⚠️ No public_id provided for deletion");
      return null;
    }

    const result = await cloudinary.uploader.destroy(publicId);
    
    if (result.result === "ok") {
      console.log(`✅ Image deleted from Cloudinary: ${publicId}`);
    } else {
      console.warn(`⚠️ Cloudinary deletion result: ${result.result}`);
    }
    
    return result;
  } catch (error) {
    console.error("❌ Cloudinary deletion error:", error);
    return null;
  }
};

/**
 * Delete multiple images from Cloudinary
 * @param {Array} publicIds - Array of public_ids to delete
 * @returns {Promise} - Cloudinary API response
 */
export const deleteMultipleFromCloudinary = async (publicIds) => {
  try {
    if (!publicIds || publicIds.length === 0) {
      return null;
    }

    const result = await cloudinary.api.delete_resources(publicIds);
    console.log(`✅ ${Object.keys(result.deleted).length} images deleted from Cloudinary`);
    return result;
  } catch (error) {
    console.error("❌ Cloudinary batch deletion error:", error);
    return null;
  }
};