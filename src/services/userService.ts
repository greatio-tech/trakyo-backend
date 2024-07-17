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



// export const addEmergencyContact = async (userId: string, contacts: Array<{ name: string, phoneNumber: string }>) => {
//   const user = await User.findById(userId);
//   if (!user) {
//     throw new Error('User not found');
//   }
//   user.emergencyContacts.push(...contacts); // Use spread operator to add all contacts at once
//   await user.save();
//   return user;
// };