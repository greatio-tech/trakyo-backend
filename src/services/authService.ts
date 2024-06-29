import { sendOtp } from '../config/twilio';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/userModel';
import { generateAccessToken, generateRefreshToken, saveRefreshToken, verifyRefreshToken } from './tokenService';

dotenv.config();

export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const loginWithOtp = async (phoneNumber: string) => {
  const otp = generateOtp();
  console.log(otp);
  
//   await sendOtp(phoneNumber, otp);
  const token = jwt.sign({ phoneNumber, otp }, process.env.JWT_SECRET!, { expiresIn: '10m' });
  return token;
  //chec
};


// export const verifyOtp = async (phoneNumber: string, otp: string, token: string) => {
//   try {
//     const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
//     if (decoded.phoneNumber === phoneNumber && decoded.otp === otp) {
//       let user = await User.findOne({ phoneNumber });
//       if (!user) {
//         user = new User({ phoneNumber });
//         await user.save();
//       }
//       const userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
//       return { user, token: userToken };
//     } else {
//       throw new Error('Invalid OTP');
//     }
//   } catch (error:any) {
//     console.log(error.message);
    
//     throw new Error('Invalid or expired token');
//   }
// };

// export const verifyOtp = async (phoneNumber: string, otp: string, token: string) => {
//   try {
//     const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
//     if (decoded.phoneNumber === phoneNumber && decoded.otp === otp) {
//       let user = await User.findOne({ phoneNumber });
//       const userExists = !!user;
//       if (!user) {
//         user = new User({ phoneNumber });
//         await user.save();
//       }
//       const userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
//       return { user, token: userToken, userExists };
//     } else {
//       throw new Error('Invalid OTP');
//     }
//   } catch (error) {
//     throw new Error('Invalid or expired token');
//   }
// };
export const verifyOtp = async (phoneNumber: string, otp: string, token: string) => {
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    if (decoded.phoneNumber === phoneNumber && decoded.otp === otp) {
      let user = await User.findOne({ phoneNumber });
      const userExists = !!user;
      if (!user) {
        user = new User({ phoneNumber });
        await user.save();
      }
      const accessToken = generateAccessToken(user._id.toString());
      const refreshToken = generateRefreshToken(user._id.toString());
      await saveRefreshToken(user._id.toString(), refreshToken);
      return { user, accessToken, refreshToken, userExists };
    } else {
      throw new Error('Invalid OTP');
    }
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

export const resendOtp = async (phoneNumber: string) => {
  const otp = generateOtp();
  console.log(otp);
  // await sendOtp(phoneNumber, otp);
  const token = jwt.sign({ phoneNumber, otp }, process.env.JWT_SECRET!, { expiresIn: '10m' });
  return token;
};
// if (!user) {
//   // Assuming you have a default email or a way to obtain one
//   const defaultEmail = "default@example.com"; // Replace this with actual logic to get or set a valid email
//   user = new User({ phoneNumber, email: defaultEmail }); // Include the email field here
//   await user.save();
// }

export const refreshToken = async (refreshToken: string) => {
  const user = await verifyRefreshToken(refreshToken);
  const accessToken = generateAccessToken(user._id.toString());
  const newRefreshToken = generateRefreshToken(user._id.toString());
  await saveRefreshToken(user._id.toString(), newRefreshToken);
  return { accessToken, refreshToken: newRefreshToken };
};