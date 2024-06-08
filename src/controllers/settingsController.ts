import { Request, Response } from 'express';
import { getUserSettings, updateUserSettings } from '../services/settingsService';

export const fetchSettings = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as any;
    const settings = await getUserSettings(userId);
    res.json(settings);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as any;
    const updateDetails = req.body;
    const settings = await updateUserSettings(userId, updateDetails);
    res.json(settings);
  } catch (error:any) {
    res.status(404).json({ message: error.message });
  }
};
