import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  fullName: String,
  phoneNumber: String,
  buldingNumber: Number,
  address: String,
  state: String,
  pincode: String,
  city: String,
}, { timestamps: true });

const Address = mongoose.model('Address', addressSchema);

export default Address;