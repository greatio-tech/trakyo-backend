import Settings from '../models/settingsModel';
import { ISettings } from '../interfaces/SettingsInterfaces';

export const getUserSettings = async (userId: string) => {
  const settings = await Settings.findOne({ user: userId });
  return settings;
};

export const updateUserSettings = async (userId: string, updateDetails: Partial<ISettings>) => {
  const settings = await Settings.findOneAndUpdate({ user: userId }, updateDetails, { new: true });
  if (!settings) {
    throw new Error('Settings not found');
  }
  return settings;
};
