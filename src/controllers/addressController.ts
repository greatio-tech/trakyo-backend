import { NextFunction, Request, Response } from 'express';
import { addressAdd } from '../services/addressService';
import { getAddress } from '../services/addressService';
import ErrorHandler from '../utils/errorHandler';

export const initiateAdd = async (req: Request, res: Response) => {
  try {
    const vehicleDetails = req.body;
    const token = await addressAdd(vehicleDetails);
    res.json({ token });
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const initiateGet = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await getAddress();
      res.json(user);
    } catch (error) {
      next(new ErrorHandler('User not found', 404));
    }
  };