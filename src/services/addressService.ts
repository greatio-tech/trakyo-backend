import Address from '../models/vehicleModel';
import { IVehicle } from '../interfaces/VehicleInterfaces';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const addressAdd = async (vehicleDetails: IVehicle) => {
//   const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
  const vehicle = new Address(vehicleDetails);
  await vehicle.save();
  return vehicle;
};

