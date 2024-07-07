import Admin from '../models/adminModel';
import QRCode from '../models/qrCodeModel';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import QRCodeLib from 'qrcode';

import { IUser } from '../interfaces/UserInterfaces';

dotenv.config();

export const createAdmin = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = new Admin({ email, password: hashedPassword });
  await admin.save();
  return admin;
};

export const loginAdmin = async (email: string, password: string) => {
  const admin = await Admin.findOne({ email });
  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    throw new Error('Invalid email or password');
  }
  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  return token;
};

// export const generateQRCodes = async (count: number, owner: string) => {
//   const qrCodes = [];
//   for (let i = 0; i < count; i++) {
//     const code = `QR${Date.now()}${i}`;
//     const qrCode = new QRCode({ code, owner });
//     await qrCode.save();
//     qrCodes.push(qrCode);
//   }
//   return qrCodes;
// };
// export const generatePredesignedQRCodes = async (count: number) => {
//   const qrCodes = [];
//   for (let i = 0; i < count; i++) {
//     const code = `QR${Date.now()}${i}`;
//     const qrCodeData = await QRCodeLib.toDataURL(code); 
//     const qrCode = new QRCode({
//       code,
//       qrCodeData,  
//       owner: null, 
//       vehicleDetails: {}, 
//     });
//     await qrCode.save();
//     qrCodes.push(qrCode);
//   }
//   return qrCodes;
// };
export const generatePredesignedQRCodes = async (count: number) => {
  const qrCodes = [];
  const baseUrl = "https://trakyo.netlify.app?"
  for (let i = 0; i < count; i++) {
    // const code = `${baseUrl}QR${Date.now()}${i}`;
    const code = `QR${Date.now()}${i}`;
    const qrCodeData = await QRCodeLib.toDataURL(baseUrl+code); 
    const qrCode = new QRCode({
      code,
      baseUrl,
      qrCodeData,  
      owner: null, 
      vehicleDetails: {}, 
    });
    await qrCode.save();
    qrCodes.push(qrCode);
  }
  return qrCodes;
};
export const manageUsers = async () => {
  const users = await User.find();
  return users;
};

export const approveUserDetailsChange = async (userId: string, details: Partial<IUser>) => {
  const user = await User.findByIdAndUpdate(userId, details, { new: true });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};