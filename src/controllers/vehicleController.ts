import { Request, Response } from 'express';
import { addVehicle, editVehicle, deleteVehicle, getVehicle, getUserVehicles } from '../services/vehicleService';


export const createVehicle = async (req: Request, res: Response) => {
  try {
    const vehicleDetails = req.body;
    const vehicle = await addVehicle(vehicleDetails);
    res.json(vehicle);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateVehicle = async (req: Request, res: Response) => {
  try {
    const vehicleId = req.params.id;
    const vehicleDetails = req.body;
    const vehicle = await editVehicle(vehicleId, vehicleDetails);
    res.json(vehicle);
  } catch (error:any) {
    res.status(404).json({ message: error.message });
  }
};

export const removeVehicle = async (req: Request, res: Response) => {
  try {
    const vehicleId = req.params.id;
    const vehicle = await deleteVehicle(vehicleId);
    res.json(vehicle);
  } catch (error:any) {
    res.status(404).json({ message: error.message });
  }
};

export const fetchVehicle = async (req: Request, res: Response) => {
  try {
    const vehicleId = req.params.id;
    const vehicle = await getVehicle(vehicleId);
    res.json(vehicle);
  } catch (error:any) {
    res.status(404).json({ message: error.message });
  }
};

export const fetchUserVehicles = async (req: Request, res: Response) => {
  try {
    // const {userId} = req.body
    const userId = req.user?.id as any;
    const vehicles = await getUserVehicles(userId) ;
    res.json(vehicles);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};
