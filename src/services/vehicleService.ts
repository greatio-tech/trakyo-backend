// import Vehicle from '../models/vehicleModel';
// import { IVehicle } from '../interfaces/VehicleInterfaces';

// export const addVehicle = async (vehicleDetails: IVehicle) => {
//   const vehicle = new Vehicle(vehicleDetails);
//   await vehicle.save();
//   return vehicle;
// };

// export const editVehicle = async (vehicleId: string, vehicleDetails: Partial<IVehicle>) => {
//   const vehicle = await Vehicle.findByIdAndUpdate(vehicleId, vehicleDetails, { new: true });
//   if (!vehicle) {
//     throw new Error('Vehicle not found');
//   }
//   return vehicle;
// };

// export const deleteVehicle = async (vehicleId: string) => {
//   const vehicle = await Vehicle.findByIdAndDelete(vehicleId);
//   if (!vehicle) {
//     throw new Error('Vehicle not found');
//   }
//   return vehicle;
// };

// export const getVehicle = async (vehicleId: string) => {
//   const vehicle = await Vehicle.findById(vehicleId);
//   if (!vehicle) {
//     throw new Error('Vehicle not found');
//   }
//   return vehicle;
// };

// export const getUserVehicles = async (userId: string) => {
//   const vehicles = await Vehicle.find({ owner: userId });
//   return vehicles;
// };


import Vehicle from '../models/vehicleModel';
import { IVehicle } from '../interfaces/VehicleInterfaces';
import { sendOtp } from '../config/twilio';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const initiateAddVehicle = async (vehicleDetails: IVehicle) => {
  const otp = generateOtp();
  // await sendOtp(vehicleDetails.ownerMobileNumber, otp);
  console.log(otp);
  
  const token = jwt.sign({ otp, vehicleDetails }, process.env.JWT_SECRET!, { expiresIn: '10m' });
  return token;
};

export const addVehicle = async (vehicleDetails: IVehicle, otp: string, token: string) => {
  const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
  if (decoded.otp !== otp) {
    throw new Error('Incorrect OTP');
  }
  const vehicle = new Vehicle(vehicleDetails);
  await vehicle.save();
  return vehicle;
};

export const initiateEditVehicle = async (vehicleId: string, vehicleDetails: Partial<IVehicle>) => {
  const otp = generateOtp();
  // await sendOtp(vehicleDetails.ownerMobileNumber!, otp);
  console.log(otp);
  
  const token = jwt.sign({ otp, vehicleId, vehicleDetails }, process.env.JWT_SECRET!, { expiresIn: '10m' });
  return token;
};

export const editVehicle = async (vehicleId: string, vehicleDetails: Partial<IVehicle>, otp: string, token: string) => {
  const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
  if (decoded.otp !== otp) {
    throw new Error('Incorrect OTP');
  }
  const vehicle = await Vehicle.findByIdAndUpdate(vehicleId, vehicleDetails, { new: true });
  if (!vehicle) {
    throw new Error('Vehicle not found');
  }
  return vehicle;
};

export const deleteVehicle = async (vehicleId: string) => {
  const vehicle = await Vehicle.findByIdAndDelete(vehicleId);
  if (!vehicle) {
    throw new Error('Vehicle not found');
  }
  return vehicle;
};

export const getVehicle = async (vehicleId: string) => {
  const vehicle = await Vehicle.findById(vehicleId);
  if (!vehicle) {
    throw new Error('Vehicle not found');
  }
  return vehicle;
};

export const getUserVehicles = async (userId: string) => {
  const vehicles = await Vehicle.find({ owner: userId });
  return vehicles;
};
