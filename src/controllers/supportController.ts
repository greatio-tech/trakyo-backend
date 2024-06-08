import { Request, Response } from 'express';
import { getSupportRequests, createSupportRequest, updateSupportRequest } from '../services/supportService';

export const fetchSupportRequests = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as any;
    const supports = await getSupportRequests(userId);
    res.json(supports);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const createSupport = async (req: Request, res: Response) => {
  try {
    const supportDetails = req.body;
    const support = await createSupportRequest(supportDetails);
    res.json(support);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSupport = async (req: Request, res: Response) => {
  try {
    const supportId = req.params.id;
    const updateDetails = req.body;
    const support = await updateSupportRequest(supportId, updateDetails);
    res.json(support);
  } catch (error:any) {
    res.status(404).json({ message: error.message });
  }
};
