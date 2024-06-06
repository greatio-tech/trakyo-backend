import mongoose from 'mongoose';

const qrCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  vehicleDetails: {
    make: String,
    model: String,
    year: Number,
    licensePlate: String,
  },
  images: [String],
}, { timestamps: true });

const QRCode = mongoose.model('QRCode', qrCodeSchema);

export default QRCode;
