import Support from '../models/supportModel';
import { ISupport } from '../interfaces/SupportInterfaces';

export const getSupportRequests = async (userId: string) => {
  const supports = await Support.find({ user: userId });
  return supports;
};

export const createSupportRequest = async (supportDetails: ISupport) => {
  const support = new Support(supportDetails);
  await support.save();
  return support;
};

export const updateSupportRequest = async (supportId: string, updateDetails: Partial<ISupport>) => {
  const support = await Support.findByIdAndUpdate(supportId, updateDetails, { new: true });
  if (!support) {
    throw new Error('Support request not found');
  }
  return support;
};
