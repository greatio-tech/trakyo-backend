// import twilio from 'twilio';
// import config from '../config/config';

// const client = twilio(config.twilioAccountSid, config.twilioAuthToken);

// export const sendOtp = async (phoneNumber: string, otp: string) => {
//   try {
//     const message = await client.messages.create({
//       body: `Your verification code is ${otp}`,
//       from: '+13606579749', // Your Twilio number
//       to: phoneNumber,
//     });
//     return message;
//   } catch (error) {
//     console.error('Failed to send OTP:', error);
//     throw new Error('Failed to send OTP');
//   }
// };

import twilio from 'twilio';
import config from '../config/config';

const client = twilio(config.twilioAccountSid, config.twilioAuthToken);

const validatePhoneNumber = async (phoneNumber: string): Promise<string | null> => {
  try {
    const response = await client.lookups.phoneNumbers(phoneNumber).fetch();
    return response.phoneNumber;  // Returns the phone number in E.164 format if valid
  } catch (error: any) {
    console.error('Invalid phone number:', error.message);
    return null;
  }
};

export const sendOtp = async (phoneNumber: string, otp: string): Promise<void> => {
  // Validate the phone number
  const validPhoneNumber = await validatePhoneNumber(phoneNumber);
  if (!validPhoneNumber) {
    console.error('Failed to send OTP: Invalid phone number');
    throw new Error('Invalid phone number');
  }

  try {
    const message = await client.messages.create({
      body: `Your verification code is ${otp}`,
      from: '+13606579749',  // Your Twilio number
      to: validPhoneNumber,
    });
    console.log('OTP sent successfully:', message.sid);
  } catch (error: any) {
    console.error('Failed to send OTP:', error.message);
    throw new Error('Failed to send OTP');
  }
};
