import { Request, Response } from 'express';
import { addressAdd } from '../services/addressService';

export const initiateAdd = async (req: Request, res: Response) => {
  try {
    const vehicleDetails = req.body;
    const token = await addressAdd(vehicleDetails);
    res.json({ token });
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};