import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

export const client = twilio(accountSid, authToken);

export const sendOtp = (phoneNumber: string, otp: string) => {
  return client.messages.create({
    body: `Your OTP code is ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phoneNumber,
  });
};


export const makeCall = (from: string, to: string, url: string) => {
  return client.calls.create({
    url,
    to,
    from,
  });
};
export const connectRedirectCall = (reciever: string,twilioPhone:string) => {
 
    const twiml = new twilio.twiml.VoiceResponse();
    const dial = twiml.dial({
      callerId:twilioPhone
    });
    dial.number(reciever);

    return({
      type:"text/xml",
      send:twiml.toString()
    })
  
};

// export const sendSms = (phoneNumber: string, message: string) => {
//   return client.messages.create({
//     body: message,
//     from: process.env.TWILIO_PHONE_NUMBER,
//     to: phoneNumber,
//   });
// };

export const sendSms = (phoneNumber: string, message: string) => {
  if (!phoneNumber) {
    throw new Error('Phone number is required');
  }
  if (!message) {
    throw new Error('Message is required');
  }
  
  return client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phoneNumber,
  });
};
