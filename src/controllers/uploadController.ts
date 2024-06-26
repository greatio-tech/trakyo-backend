// import { Request, Response } from 'express';
// import { uploadImageToCloudinary } from '../services/uploadService';

// export const uploadImage = async (req: Request, res: Response) => {
//   if (!req.file) {
//     return res.status(400).json({ message: 'No file uploaded' });
//   }

//   try {
//     const result = await uploadImageToCloudinary(req.file.path);
//     res.status(200).json({
//       message: 'Image uploaded successfully',
//       url: result.secure_url,
//       public_id: result.public_id,
//     });
//   } catch (error:any) {
//     res.status(500).json({ message: error.message });
//   }
// };
// import { Request, Response } from 'express';
// import { uploadImageToCloudinary } from '../services/uploadService';

// export const uploadImage = async (req: Request, res: Response) => {
//   if (!req.file) {
//     return res.status(400).json({ message: 'No file uploaded' });
//   }

//   try {
//     const result = await uploadImageToCloudinary(req.file.path);
//     res.status(200).json({
//       message: 'Image uploaded successfully',
//       url: result.secure_url,
//       public_id: result.public_id,
//     });
//   } catch (error:any) {
//     res.status(500).json({ message: error.message });
//   }
// };


import { Request, Response } from 'express';

export const uploadImage = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    res.status(200).json({
      message: 'Image uploaded successfully',
      url: req.file.path,
      public_id: req.file.filename,
    });
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};
