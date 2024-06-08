import { Request, Response } from 'express';
import { getQRCodeDetails, createQRCode, updateQRCodeDetails, scanQRCode } from '../services/qrCodeService';
// import cloudinary from '../config/cloudinary';
import QRCode from '../models/qrCodeModel';

export const getQRCode = async (req: Request, res: Response) => {
  try {
    const code = req.params.code;
    const qrCode = await getQRCodeDetails(code);
    res.json(qrCode);
  } catch (error:any) {
    res.status(404).json({ message: error.message });
  }
};

export const createQRCodeEntry = async (req: Request, res: Response) => {
  try {
    const qrCodeDetails = req.body;
    const qrCode = await createQRCode(qrCodeDetails);
    res.json(qrCode);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateQRCodeEntry = async (req: Request, res: Response) => {
  try {
    const code = req.params.code;
    const qrCodeDetails = req.body;
    const qrCode = await updateQRCodeDetails(code, qrCodeDetails);
    res.json(qrCode);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};


// export const uploadImage = async (req: Request, res: Response) => {
//   try {
//     const qrCodeId = req.params.id;
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }
//     const result = await cloudinary.uploader.upload(req.file.path);
//     const qrCode = await QRCode.findByIdAndUpdate(
//       qrCodeId,
//       { $push: { images: result.secure_url } },
//       { new: true }
//     );
//     res.json(qrCode);
//   } catch (error:any) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const scanCode = async (req: Request, res: Response) => {
  try {
    const code = req.params.code;
    const qrCode = await scanQRCode(code);
    res.json(qrCode);
  } catch (error:any) {
    res.status(404).json({ message: error.message });
  }
};