import QRCode from '../models/qrCodeModel';
import User from '../models/userModel';
import { IQRCode } from '../interfaces/QRCodeInterfaces';
import mongoose from 'mongoose';

export const getQRCodeDetails = async (code: string) => {
  const qrCode = await QRCode.findOne({ code }).populate('owner');
  if (!qrCode) {
    throw new Error('QR Code not found');
  }
  return qrCode;
};

export const createQRCode = async (qrCodeDetails: IQRCode) => {
  const qrCode = new QRCode(qrCodeDetails);
  await qrCode.save();
  return qrCode;
};

export const updateQRCodeDetails = async (code: string, qrCodeDetails: Partial<IQRCode>) => {
  const qrCode = await QRCode.findOneAndUpdate({ code }, qrCodeDetails, { new: true });
  if (!qrCode) {
    throw new Error('QR Code not found');
  }
  return qrCode;
};

// export const scanQRCode = async (code: string) => {
//   const qrCode = await QRCode.findOne({ code }).populate('owner');
//   if (!qrCode) {
//     throw new Error('QR Code not found');
//   }
//   return qrCode;
// };

export const scanQRCode = async (code: string, vehicleDetails: any, userId: string) => {
  const qrCode = await QRCode.findOne({ code });
  if (!qrCode) {
    throw new Error('QR Code not found');
  }
  qrCode.vehicleDetails = vehicleDetails;
  // qrCode.owner = userId;
  qrCode.owner = new mongoose.Types.ObjectId(userId);
  await qrCode.save();
  return qrCode;
};