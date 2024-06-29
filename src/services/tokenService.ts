import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/userModel';

dotenv.config();

const generateAccessToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET!, { expiresIn: '1h' });
};

const generateRefreshToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET!, { expiresIn: '7d' });
};

const saveRefreshToken = async (userId: string, refreshToken: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  user.refreshToken = refreshToken;
  await user.save();
};

const verifyRefreshToken = async (refreshToken: string) => {
  try {
    const decoded: any = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      throw new Error('Invalid refresh token');
    }
    return user;
  } catch (error) {
    throw new Error('Invalid or expired refresh token');
  }
};

export { generateAccessToken, generateRefreshToken, saveRefreshToken, verifyRefreshToken };


// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// import User from '../models/userModel';
// import { IUser } from '../interfaces/UserInterfaces';

// dotenv.config();

// const generateAccessToken = (userId: string): string => {
//   return jwt.sign({ id: userId }, process.env.JWT_SECRET!, { expiresIn: '1h' });
// };

// const generateRefreshToken = (userId: string): string => {
//   return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET!, { expiresIn: '7d' });
// };

// const saveRefreshToken = async (userId: string, refreshToken: string): Promise<void> => {
//   const user = await User.findById(userId);
//   if (!user) {
//     throw new Error('User not found');
//   }
//   user.refreshToken = refreshToken;
//   await user.save();
// };

// const verifyRefreshToken = async (refreshToken: string) => {
//   try {
//     const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { id: string };
//     const user = await User.findById(decoded.id);
//     if (!user || user.refreshToken !== refreshToken) {
//       throw new Error('Invalid refresh token');
//     }
//     return user;
//   } catch (error) {
//     throw new Error('Invalid or expired refresh token');
//   }
// };

// export { generateAccessToken, generateRefreshToken, saveRefreshToken, verifyRefreshToken };
