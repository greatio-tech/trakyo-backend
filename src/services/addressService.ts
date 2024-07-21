import Address from "../models/addressModel";
import { IAddress } from "../interfaces/addressInterfaces";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// export const addressAdd = async (AddressDetails: IAddress) => {
//   //   const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
//   const address = new Address(AddressDetails);
//   await address.save();
//   return address;
// };

export const getAddress = async () => {
  const user = await Address.find();
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};


export const addressAdd = async (userId: string, AddressDetails: IAddress) => {
  const address = new Address({
    userId,
    ...AddressDetails
  });
  await address.save();
  return address;
};

export const getAddressByUserId = async (userId: string) => {
  const userAddresses = await Address.find({ userId }); 
  if (!userAddresses || userAddresses.length === 0) {
    throw new Error("No addresses found for this user");
  }
  return userAddresses;
};

export const addressUpdate = async (userId: string, addressId: string, updatedAddressDetails: Partial<IAddress>) => {
  const address = await Address.findByIdAndUpdate(addressId, updatedAddressDetails, { new: true, runValidators: true });
  if (!address) {
    throw new Error("Address not found");
  }
  return address;
};

export const addressRemove = async (userId: string, addressId: string) => {
  const address = await Address.findByIdAndDelete(addressId);
  if (!address) {
    throw new Error("Address not found");
  }
  return address;
};