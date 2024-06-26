// import multer from 'multer';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import cloudinary from '../config/cloudinary';

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     return {
//       folder: 'vehicle-contact-app',
//       format: 'png', // or 'jpeg', 'jpg', etc.
//       public_id: file.originalname,
//       resource_type: 'auto', // Automatically detect the file type
//     };
//   },
// });

// const upload = multer({ storage });

// export default upload;

import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return{
    folder: 'vehicle-contact-app',
    format: 'png', // Or 'jpeg', 'jpg', etc.
    public_id: file.originalname,
    resource_type: 'auto',
    };
  },
});

const upload = multer({ storage });

export default upload;
