import { makeCall,connectRedirectCall } from '../config/twilio';
import callLogsModel from '../models/callLogsModel';
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


// call logs

export const addCallLogEntry = async (caller:any,reciever:any,virtualNumber:string,status:string,moreInfo?:any) => {
  const recordToSave = new callLogsModel({
    caller,
    reciever,
    virtualNumber,
    status,
    moreInfo
  });
  await recordToSave.save();
  return recordToSave;
};
export const updateCallLogEntry = async (caller?:any,reciever?:any,virtualNumber?:string,searchStatus?:string,moreInfo?:any) => {
  const now = new Date();
  const fifteenMinutesAgo = new Date(now.getTime() - 15 * 60 * 1000);
  console.log(caller,virtualNumber)
  let status = moreInfo?.CallStatus
  let x = await callLogsModel.findOneAndUpdate({
    'caller.number':caller.number,
    virtualNumber:virtualNumber,
    status:searchStatus,
    createdAt: { $lte: fifteenMinutesAgo }
  },{
    status,
    moreInfo

  })
  return x;
};