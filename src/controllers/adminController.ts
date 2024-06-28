import { Request, Response } from 'express';
import { createAdmin, loginAdmin, manageUsers, approveUserDetailsChange, generatePredesignedQRCodes } from '../services/adminService';

export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const admin = await createAdmin(email, password);
    res.json(admin);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await loginAdmin(email, password);
    res.json({ token });
  } catch (error:any) {
    res.status(401).json({ message: error.message });
  }
};

// export const generateCodes = async (req: Request, res: Response) => {
//   try {
//     const { count, owner } = req.body;
//     const qrCodes = await generateQRCodes(count, owner);
//     res.json(qrCodes);
//   } catch (error:any) {
//     res.status(500).json({ message: error.message });
//   }
// };
export const generateCodes = async (req: Request, res: Response) => {
  try {
    const { count } = req.body;
    const qrCodes = await generatePredesignedQRCodes(count);
    res.json(qrCodes);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await manageUsers();
    res.json(users);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const approveChange = async (req: Request, res: Response) => {
  try {
    const { userId, details } = req.body;
    const user = await approveUserDetailsChange(userId, details);
    res.json(user);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};