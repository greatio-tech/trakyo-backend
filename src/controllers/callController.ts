import { Request, Response } from 'express';
import { initiateCall } from '../services/callService';

export const startCall = async (req: Request, res: Response) => {
  const { from, to, url } = req.body;
  try {
    const call = await initiateCall(from, to, url);
    res.json(call);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};
