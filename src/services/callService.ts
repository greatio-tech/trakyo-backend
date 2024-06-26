import { makeCall } from '../config/twilio';

export const initiateCall = async (from: string, to: string, url: string) => {
  const call = await makeCall(from, to, url);
  return call;
};
