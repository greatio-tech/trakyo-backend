import { Request, Response } from 'express';
import { loginWithOtp, resendOtp, verifyOtp ,refreshToken} from '../services/authService';

export const login = async (req: Request, res: Response) => {
  const { phoneNumber } = req.body;
  try {
    const token = await loginWithOtp(phoneNumber);
    res.json({ token });
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

// export const verify = async (req: Request, res: Response) => {
//   const { phoneNumber, otp, token } = req.body;
//   try {
//     const { user, accessToken, refreshToken, userExists } = await verifyOtp(phoneNumber, otp, token);
//     res.json({ user, accessToken, refreshToken, userExists });
//   } catch (error:any) {
//     res.status(400).json({ message: error.message });
//   }
// };
export const verify = async (req: Request, res: Response) => {
  const { phoneNumber, otp, token } = req.body;
  try {
    const { user, accessToken, refreshToken, userExists } = await verifyOtp(phoneNumber, otp, token);
    res.json({ user, accessToken, refreshToken, userExists });
  } catch (error:any) {
    if (error.message === 'Incorrect OTP') {
      res.status(401).json({ message: 'Incorrect OTP' });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};


export const resend = async (req: Request, res: Response) => {
  const { phoneNumber } = req.body;
  try {
    const token = await resendOtp(phoneNumber);
    res.json({ token });
  } catch (error:any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const refresh = async (req: Request, res: Response) => {
  const { refreshToken: token } = req.body;
  try {
    const { accessToken, refreshToken:newRefreshToken } = await refreshToken(token);
    res.json({ accessToken, refreshToken:newRefreshToken });
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};