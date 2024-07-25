import User from '../models/userModel';
import { sendSms } from '../config/twilio';
import { connectedUsers, io } from '../server';

export const alertHomeOwner = async (userId: string, message: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const fullMessage = `${message}`;
  const result = await sendSms(user.phoneNumber,fullMessage);
  return result;
};
//   const result = await sendSms(user.phoneNumber, message);
//   return result;
// };

// export const sendInAppNotification = (io: any, userId: string, message: string) => {
//   io.to(userId).emit('notification', message);
// };

// export const sendInAppNotification = (io: any, userId: string, message: string, imageUrl: string) => {
//     const fullMessage = {
//       text: message,
//       image: imageUrl,
//     };
//     console.log("Sending notification to:", userId);
//     console.log(io); // Should log the io instance, not undefined
//     io.to(userId).emit('notification', fullMessage);
//   };

export const sendInAppNotification = (userId: string, message: string, imageUrl: string) => {
  const fullMessage = {
    text: message,
    image: imageUrl,
  };
  console.log("Sending notification to:", userId);
  // console.log(io); 
  
  const socketId = connectedUsers[userId];
  if (socketId) {
    io.to(socketId).emit('notification', fullMessage);
  } else {
    console.log(`User with ID ${userId} is not connected`)
  }
};