import { Request, Response } from 'express';
import { initiateCall, connectCallService } from '../services/callService';

const hostNameOfThisServer = process.env.HOSTNAMEOFTHISSERVER || "https://7628-103-70-197-88.ngrok-free.app"
const twilionumber = `+13606579749`;

export const startCall = async (req: Request, res: Response) => {
  const { from, to } = req.body;
  
  try {
    const url = `${hostNameOfThisServer}/api/calls/connect?reciever=${encodeURIComponent(
      to
      )}`
    const call = await initiateCall(twilionumber, from, url);
    res.json(call);
  } catch (error:any) {
    res.status(500).json({ message: error.message ||error });
  }
};
export const connectCall = async (req: Request, res: Response) => {
  const reciever  = String(req.query.reciever) || null;
  console.log(
    "this is connecting call"
  )
  try {
    // const url = `${hostNameOfThisServer}/connect?reciever=${encodeURIComponent(
    //   to
    //   )}`
    if (!reciever) {throw `error : reciever number not provided`}
      const call = await connectCallService(twilionumber,reciever)
      res.type(call.type);
      res.send(call.send);
  } catch (error:any) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};
