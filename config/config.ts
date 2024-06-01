import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI as string,
  jwtSecret: process.env.JWT_SECRET as string,
  twilioAccountSid: process.env.TWILIO_ACCOUNT_SID as string,
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN as string,
  twilionuber: process.env.TWILIO_PHONE_NUMBER as string
};
