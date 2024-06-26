import User from '../models/userModel';
import { IUser } from '../interfaces/UserInterfaces';
// import { uploadImageToCloudinary } from './uploadService';

export const getUserDetails = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

export const updateUserDetails = async (userId: string, userDetails: Partial<IUser>) => {
  const user = await User.findByIdAndUpdate(userId, userDetails, { new: true });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};
// export const updateUserDetails = async (userId: string, userDetails: Partial<IUser>, file?: Express.Multer.File) => {
//   if (file) {
//     const result = await uploadImageToCloudinary(file.path);
//     userDetails.profilePicture = result.secure_url;
//   }

//   const user = await User.findByIdAndUpdate(userId, userDetails, { new: true });
//   if (!user) {
//     throw new Error('User not found');
//   }
//   return user;
// };

export const addEmergencyContact = async (userId: string, contact: { name: string, phoneNumber: string }) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  user.emergencyContacts.push(contact);
  await user.save();
  return user;
};