import { makeCall,connectRedirectCall } from '../config/twilio';
import TemporaryCallRedirectModel from '../models/TempCallRedirectsModel';



export const connectCallService = async (twilioPhone: string, to: string) => {
  const call = await connectRedirectCall(to,twilioPhone)
  return call;
};

export const getCallRedirects = async () => {
  const temporaryCallRedirects = await TemporaryCallRedirectModel.find();
  if (!temporaryCallRedirects) {
    throw new Error("temporaryCallRedirects not found");
  }
  return temporaryCallRedirects;
};



export const saveRelationCallerReciever = async (fromNumber: string,fromCountryCode: string, toNumber: string,toCountryCode: string, virtualNumber:string) => {
  const recordToSave = new TemporaryCallRedirectModel({
   virtualNumber:virtualNumber,
   caller:{
    countryCode:fromCountryCode,
    number:fromNumber
   },
   receiver:{
    countryCode:toCountryCode,
    number:toNumber
   }
  });
  await recordToSave.save();
  return recordToSave;
};