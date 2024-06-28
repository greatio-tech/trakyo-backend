import User from '../models/userModel';
import { sendSms } from '../config/twilio';

export const alertHomeOwner = async (userId: string, message: string,imageUrl: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const fullMessage = `${message} \nImage: ${imageUrl}`;
  const result = await sendSms(user.phoneNumber, fullMessage);
  return result;
};
//   const result = await sendSms(user.phoneNumber, message);
//   return result;
// };

// export const sendInAppNotification = (io: any, userId: string, message: string) => {
//   io.to(userId).emit('notification', message);
// };

export const sendInAppNotification = (io: any, userId: string, message: string, imageUrl: string) => {
    const fullMessage = {
      text: message,
      image: imageUrl,
    };
    io.to(userId).emit('notification', fullMessage);
  };
