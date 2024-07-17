// import { Request, Response } from 'express';
// import { addEmergencyContact, getUserDetails, updateUserDetails } from '../services/userService';

// export const getUser = async (req: Request, res: Response) => {
//   try {
//     const userId = req.params.id;
//     const user = await getUserDetails(userId);
//     res.json(user);
//   } catch (error:any) {
//     res.status(404).json({ message: error.message });
//   }
// };

// export const updateUser = async (req: Request, res: Response) => {
//   try {
//     const userId = req.params.id;
//     const userDetails = req.body;
//     const user = await updateUserDetails(userId, userDetails);
//     res.json(user);
//   } catch (error:any) {
//     res.status(404).json({ message: error.message });
//   }
// };

// export const addContact = async (req: Request, res: Response) => {
//   try {
//     const userId = req.params.id;
//     const contact = req.body;
//     const user = await addEmergencyContact(userId, contact);
//     res.json(user);
//   } catch (error:any) {
//     res.status(404).json({ message: error.message });
//   }
// };

import { Request, Response, NextFunction } from 'express';
import { getUserDetails, updateUserDetails,  } from '../services/userService';
import ErrorHandler from '../utils/errorHandler';

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const user = await getUserDetails(userId);
    res.json(user);
  } catch (error) {
    next(new ErrorHandler('User not found', 404));
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const userDetails = req.body;
    const user = await updateUserDetails(userId, userDetails);
    res.json(user);
  } catch (error) {
    next(new ErrorHandler('Failed to update user details', 400));
  }
};


// export const updateUser = async (req: Request, res: Response) => {
//   try {
//     const userId = req.params.id;
//     const userDetails = req.body;
//     const file = req.file;
//     const user = await updateUserDetails(userId, userDetails, file);
//     res.json(user);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

// export const addContact = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const userId = req.params.id;
//     // const contact = req.body;
//     const contacts = req.body.contacts; // Expecting an array of contacts
//     const user = await addEmergencyContact(userId, contacts);
//     res.json(user);
//   } catch (error) {
//     next(new ErrorHandler('Failed to add emergency contact', 400));
//   }
// };
