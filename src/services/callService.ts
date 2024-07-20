import { makeCall,connectRedirectCall } from '../config/twilio';

export const initiateCall = async (from: string, to: string, url: string) => {
  const call = await makeCall(from, to, url);
  
  return call;
};
export const connectCallService = async (twilioPhone: string, to: string) => {
  const call = await connectRedirectCall(to,twilioPhone)
  return call;
};
