// import multer from 'multer';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import cloudinary from '../config/cloudinary';


// interface CloudinaryStorageParams {
//     folder?: string;
//     allowed_formats?: string[];
//   }
  
//   const storage = new CloudinaryStorage({
//     cloudinary,
//     params: {
//       folder: 'images',
//       allowed_formats: ['jpg', 'png'],
//     } as CloudinaryStorageParams, 
//   });
  
//   const upload = multer({ storage });
  
//   export default upload;
  
// import multer from 'multer';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import cloudinary from '../config/cloudinary';

// interface CloudinaryStorageParams {
//     folder?: string;
//     allowed_formats?: string[];
//   }
  
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'vehicle-contact-app',
//     format: async () =>  ['jpg', 'png'], // Or 'jpeg', 'jpg', etc.
//     public_id: (req: any, file: { originalname: any; }) => file.originalname,
//   } as CloudinaryStorageParams,
// });

// const upload = multer({ storage });

// export default upload;
