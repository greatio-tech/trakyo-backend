import Address from "../models/addressModel";
import { IAddress } from "../interfaces/addressInterfaces";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const addressAdd = async (AddressDetails: IAddress) => {
  //   const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
  const address = new Address(AddressDetails);
  await address.save();
  return address;
};

export const getAddress = async () => {
  const user = await Address.find();
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};
