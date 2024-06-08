import { Request, Response } from 'express';
import { listQRCodes } from '../services/listingService';

export const getQRCodes = async (req: Request, res: Response) => {
  try {
    const qrCodes = await listQRCodes();
    res.json(qrCodes);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};
