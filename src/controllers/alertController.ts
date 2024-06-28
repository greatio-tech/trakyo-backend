import { Request, Response } from 'express';
import { alertHomeOwner, sendInAppNotification } from '../services/alertService';
import { uploadImageToCloudinary } from '../services/uploadService';

// export const alertOwner = async (req: Request, res: Response) => {
//   const { userId, message } = req.body;
//   const io = req.app.get('io');

//   try {
//     await alertHomeOwner(userId, message);
//     sendInAppNotification(io, userId, message);
//     res.status(200).json({ message: 'Alert sent successfully' });
//   } catch (error:any) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const alertOwner = async (req: Request, res: Response) => {
    const { userId, message } = req.body;
    const io = req.app.get('io');
    let imageUrl = '';
  
    if (req.file) {
      const result = await uploadImageToCloudinary(req.file.path);
      imageUrl = result.secure_url;
    }
  
    try {
      await alertHomeOwner(userId, message, imageUrl);
      sendInAppNotification(io, userId, message, imageUrl);
      res.status(200).json({ message: 'Alert sent successfully' });
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  };