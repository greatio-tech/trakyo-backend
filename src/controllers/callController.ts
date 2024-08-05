import { Request, Response } from "express";
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

// const connectReciever: any = {
//   "08111957466": "+919746716060",
//   "09446588245": "+918943664724",
// };
const exotelNumbers = ["04954265711"]; //|| process.env.EXO_PHONE_NUMBERS?.split(',');
export const startCall = async (req: Request, res: Response) => {
  const { fromNumber, fromCountryCode = "+91", qrCode } = req.body;

  try {
    // const url = `${hostNameOfThisServer}/api/calls/connect?reciever=${encodeURIComponent(
    //   to
    //   )}`
    // const call = await initiateCall(twilionumber, from, url);
    // res.json(call);

    if (!fromNumber || !fromCountryCode || !qrCode)
      throw "Mandatory fields in request body should be filled .";

    console.log(typeof qrCode)

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
      "receiver.number": `${toNumber}`,
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
    await addCallLogEntry(
      call.caller,
      call.receiver,
      call.virtualNumber,
      "generatedCall",
      null
    );

    res.json(call);
  } catch (error: any) {
    res.status(500).json({ message: error.message || error });
  }
};
export const incomingCall = async (req: Request, res: Response) => {
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
      String(callRedirectRecord?.receiver?.countryCode) +
      String(callRedirectRecord?.receiver?.number);

    //update call log in DB
    const x = await updateCallLogEntry(
      callRedirectRecord?.caller,
      callRedirectRecord?.receiver,
      callRedirectRecord?.virtualNumber,
      "generatedCall",
      queryContent
    );
    return;
    res.type("text/plain").send(recieverNumber);
    console.log("called from " + callFrom + " to " + recieverNumber);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const connectCall = async (req: Request, res: Response) => {
  const reciever = String(req.query.reciever) || null;
  console.log("this is connecting call");
  try {
    // const url = `${hostNameOfThisServer}/connect?reciever=${encodeURIComponent(
    //   to
    //   )}`
    if (!reciever) {
      throw `error : reciever number not provided`;
    }
    const call = await connectCallService(twilionumber, reciever);
    res.type(call.type);
    res.send(call.send);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
