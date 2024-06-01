import { Request, Response } from 'express';
import { loginWithOtp, verifyOtp } from '../services/authService';

export const login = async (req: Request, res: Response) => {
  const { phoneNumber } = req.body;
  try {
    const token = await loginWithOtp(phoneNumber);
    res.json({ token });
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const verify = async (req: Request, res: Response) => {
  const { phoneNumber, otp, token } = req.body;
  try {
    const { user, token: userToken } = await verifyOtp(phoneNumber, otp, token);
    res.json({ user, token: userToken });
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};
