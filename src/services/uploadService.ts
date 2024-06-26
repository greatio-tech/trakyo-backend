import cloudinary from '../config/cloudinary';

export const uploadImageToCloudinary = async (filePath: string) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'vehicle-contact-app',
    });
    return result;
  } catch (error) {
    throw new Error('Failed to upload image');
  }
};
