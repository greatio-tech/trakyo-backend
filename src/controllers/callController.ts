import { Request, Response } from 'express';
import { initiateCall, connectCallService } from '../services/callService';

const hostNameOfThisServer = process.env.HOSTNAME_OF_THIS_SERVER || "https://7628-103-70-197-88.ngrok-free.app"
const twilionumber = process.env.TWILIO_PHONE_NUMBER  || `+13606579749`;

const connectReciever: any = {
  "08111957466":"+919746716060",
  "09446588245":"+918943664724"
}
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
export const incomingCall = async (req: Request, res: Response) => {
  const callFrom  = String(req.query.CallFrom) ;

  console.log(
    "this is connecting call from " + callFrom
  )
  
  try {
    if(!callFrom) throw "caller is undefined"
    const recieverNumber = connectReciever[callFrom]
    res.type( 'text/plain').send(recieverNumber)
    console.log(
      "called from " + callFrom + " to " + recieverNumber
    ) 
  } catch (error:any) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};
