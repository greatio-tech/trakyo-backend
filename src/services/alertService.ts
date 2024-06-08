// import User from '../models/userModel';
// import { sendSms } from '../config/twilio';

// export const alertHomeOwner = async (userId: string, message: string) => {
//   const user = await User.findById(userId);
//   if (!user) {
//     throw new Error('User not found');
//   }
  
//   const result = await sendSms(user.phoneNumber, message);
//   return result;
// };
