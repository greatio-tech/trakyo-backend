import Vehicle from '../models/vehicleModel';
import { IVehicle } from '../interfaces/VehicleInterfaces';

export const addVehicle = async (vehicleDetails: IVehicle) => {
  const vehicle = new Vehicle(vehicleDetails);
  await vehicle.save();
  return vehicle;
};

export const editVehicle = async (vehicleId: string, vehicleDetails: Partial<IVehicle>) => {
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
