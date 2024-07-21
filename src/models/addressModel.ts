import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    fullName: String,
    phoneNumber: String,
    buldingNumber: String,
    address: String,
    state: String,
    pincode: String,
    city: String,
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", addressSchema);

export default Address;
