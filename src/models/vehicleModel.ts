// import mongoose from 'mongoose';

// const vehicleSchema = new mongoose.Schema({
//   owner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   make: String,
//   model: String,
//   year: Number,
//   licensePlate: String,
// }, { timestamps: true });

// const Vehicle = mongoose.model('Vehicle', vehicleSchema);

// export default Vehicle;

import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  vehicleType: {
    type: String,
    required: true,
  },
  ownerMobileNumber: {
    type: String,
    required: true,
  },
  make: String,
  model: String,
  year: Number,
  licensePlate: String,
}, { timestamps: true });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;

