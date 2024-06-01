import { Request, Response } from 'express';
import { getQRCodeDetails, createQRCode, updateQRCodeDetails } from '../services/qrCodeService';
import cloudinary from '../config/cloudinary';

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

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const { path } = req.file as any;
    res.json({ imageUrl: path });
  } catch (error:any) {
    console.log(error);
    
    res.status(500).json({ message: error.message });
  }
};