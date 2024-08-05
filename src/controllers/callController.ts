import { Request, Response  } from "express";
import {
  addCallLogEntry,
  connectCallService,
  saveRelationCallerReciever,
  updateCallLogEntry,
} from "../services/callService";
import TemporaryCallRedirect from "../models/TempCallRedirectsModel";
import callLogsModel from "../models/callLogsModel";
import QRCodeModel from "../models/qrCodeModel";
import mongoose from "mongoose";
const { parsePhoneNumberFromString } = require("libphonenumber-js");
const hostNameOfThisServer =
  process.env.HOSTNAME_OF_THIS_SERVER ||
  "https://7628-103-70-197-88.ngrok-free.app";
const twilionumber = process.env.TWILIO_PHONE_NUMBER || `+13606579749`;




const exotelNumbers = ["04954265711"]; //|| process.env.EXO_PHONE_NUMBERS?.split(',');
export const startCall = async (req: Request, res: Response ,next:any) => {
  const { fromNumber, fromCountryCode = "+91", qrCode } = req.body;

  try {

    if (!fromNumber || !fromCountryCode || !qrCode)
      throw "Mandatory fields in request body should be filled .";


    const QR_ownerDetails: any = await QRCodeModel.aggregate([
      {
        $match:{
          code:qrCode
        }
      },
      {
    
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: {
          path: "$userDetails",
        },
      },
    ]);
    if (!QR_ownerDetails[0]) throw "invalid owner";



    const recieverPhoneNumber = QR_ownerDetails[0].userDetails?.phoneNumber;
    if (!recieverPhoneNumber) throw "invalid owner number.";
    const parsedPhoneReciever = parsePhoneNumberFromString(recieverPhoneNumber);
    const toCountryCode = `+${parsedPhoneReciever.countryCallingCode}`;
    const toNumber = String(parsedPhoneReciever.nationalNumber);

    const alreadyExistingForSameReciever = await TemporaryCallRedirect.findOne({
      "caller.number": `${fromNumber}`,
      "reciever.number": `${toNumber}`,
    }).sort({ createdAt: 1 });
    if (alreadyExistingForSameReciever)
      throw "Already existing in records of call redirect collection.";

    const fromNumberRecentRedirectRecords = await TemporaryCallRedirect.find({
      "caller.number": `${fromNumber}`,
    }).sort({ createdAt: 1 });

    const arrOfUsedVitualNumbers = fromNumberRecentRedirectRecords?.map(
      (redirectObject) => {
        return redirectObject.virtualNumber;
      }
    );
    const availableVirtualNumbers = exotelNumbers.filter(
      (exophone) => !arrOfUsedVitualNumbers.includes(exophone)
    );
    let virtualNumberToReplace = availableVirtualNumbers[0];
    if (availableVirtualNumbers.length == 0) {
      //delete first record get the virtual number for that.

      virtualNumberToReplace =
        fromNumberRecentRedirectRecords[0]?.virtualNumber;
      await TemporaryCallRedirect.findByIdAndDelete(
        fromNumberRecentRedirectRecords[0]?._id
      );
      console.log("deleted old record");
    }

    const call = await saveRelationCallerReciever(
      fromNumber,
      fromCountryCode,
      toNumber,
      toCountryCode,
      virtualNumberToReplace
    );

    //create a record in call Logs :
    // const callLogResponse = await addCallLogEntry(
    //   call.caller,
    //   call.reciever,
    //   call.virtualNumber,
    //   "generatedCall",
    //   null
    // );

    res.json({
      virtualNumber:call.virtualNumber
    });
  } catch (error: any) {
    next( new Error(error))
    // res.status(500).json({ message: error.message || error });
  }
};
export const incomingCall = async (req: Request, res: Response,next:any) => {
  let callFrom = String(req.query.CallFrom);
  const exoPhoneForThisSession = String(req.query.CallTo);

  console.log("this is connecting call from " + callFrom);

  try {
    let queryContent = req.query;
    if (!callFrom) throw "caller is undefined";

    if (callFrom.length == 11) {
      callFrom = callFrom.slice(1);
    }
    if (!exoPhoneForThisSession) throw "exophone is undefined";
    const callRedirectRecord = await TemporaryCallRedirect.findOne({
      virtualNumber: exoPhoneForThisSession,
      "caller.number": `${callFrom}`,
    });
    if (!callRedirectRecord)
      throw "This caller have No Entry in callRedirectCollection .";

    const recieverNumber =
      String(callRedirectRecord?.reciever?.countryCode) +
      String(callRedirectRecord?.reciever?.number);

    //update call log in DB
    // const x = await updateCallLogEntry(
    //   callRedirectRecord?.caller,
    //   callRedirectRecord?.reciever,
    //   callRedirectRecord?.virtualNumber,
    //   "generatedCall",
    //   queryContent
    // );
      const callLogResponse = await addCallLogEntry(
      callRedirectRecord.caller,
      callRedirectRecord.reciever,
      callRedirectRecord.virtualNumber,
      "initiated-call",
      queryContent
    );
    console.log("called from " + callFrom + " to " + recieverNumber);
    res.type("text/plain").send(recieverNumber);
    return;
  } catch (error: any) {
    next( new Error(error))
  }
};



//twilio api
export const connectCall = async (req: Request, res: Response , next:any) => {

  try {
   const queryContent = (req.query)
   console.log("queryContent",queryContent)
   const callLogObject =  await callLogsModel.findOneAndUpdate({'moreInfo.CallSid':queryContent.CallSid},{moreInfo:queryContent,status:queryContent.DialCallStatus})
   console.log("call log updated for  _callLogId : ",callLogObject?._id)
   res.status(200).json({
    message:"call log updated Successfully.",

   })
  } catch (error: any) {
    next( new Error(error))

  }
};
