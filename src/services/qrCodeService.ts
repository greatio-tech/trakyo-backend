import QRCode from '../models/qrCodeModel';
import User from '../models/userModel';
import { IQRCode } from '../interfaces/QRCodeInterfaces';
import mongoose from 'mongoose';
import Vehicle from '../models/vehicleModel';

export const getQRCodeDetails = async (code: string) => {
  // const hardCode=`https://trakyo.netlify.app?/${code}`
  // const qrCode = await QRCode.findOne({ code:hardCode }).populate('owner');
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

// export const scanQRCode = async (code: string, vehicleDetails: any, userId: string) => {
//   const qrCode = await QRCode.findOne({ code });
//   if (!qrCode) {
//     throw new Error('QR Code not found');
//   }
//   qrCode.vehicleDetails = vehicleDetails;
//   // qrCode.owner = userId;
//   qrCode.owner = new mongoose.Types.ObjectId(userId);
//   await qrCode.save();
//   return qrCode;
// };

export const scanQRCode = async (vehicleId: string, userId: string,code:string) => {
  const vehicleDetails = await Vehicle.findOne({ _id: vehicleId }); 
  if (!vehicleDetails) {
    throw new Error('Vehicle not found');
  }

  const owner = await User.findOne({ _id: userId }); 
  if (!owner) {
    throw new Error('Owner not found');
  }

  const qrCode = await QRCode.findOne({ code }); 
  if (!qrCode) {
    throw new Error('QR Code not found');
  }

  qrCode.vehicleDetails = vehicleDetails;
  qrCode.owner = owner._id;

  await qrCode.save();

  return qrCode;
};