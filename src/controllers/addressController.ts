import { NextFunction, Request, Response } from 'express';
import { addressAdd, addressRemove, addressUpdate, getAddressByUserId } from '../services/addressService';
import { getAddress } from '../services/addressService';
import ErrorHandler from '../utils/errorHandler';

// export const initiateAdd = async (req: Request, res: Response) => {
//   try {
//     console.log(req.body,"reqqqq");
//     const addressDetails = req.body;
//     const token = await addressAdd(addressDetails);
//     res.json({ token });
//   } catch (error:any) {
//     res.status(500).json({ message: error.message });
//   }
// };
// export const initiateGet = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const user = await getAddress();
//     res.json(user);
//   } catch (error) {
//     next(new ErrorHandler('User not found', 404));
//   }
// };
export const initiateAdd = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as any; 
    const addressDetails = req.body;
    const token = await addressAdd(userId, addressDetails);
    res.json({ token });
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const initiateGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id as any; 
    const userAddresses = await getAddressByUserId(userId);
    res.json(userAddresses);
  } catch (error:any) {
    next(new ErrorHandler(error.message, 404));
  }
};

export const initiateEdit = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as any;
    const addressId = req.params.addressId;
    const updatedAddressDetails = req.body;
    const updatedAddress = await addressUpdate(userId, addressId, updatedAddressDetails);
    res.json(updatedAddress);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const initiateDelete = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as any;
    const addressId = req.params.addressId;
    await addressRemove(userId, addressId);
    res.status(204).end(); // No content
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};