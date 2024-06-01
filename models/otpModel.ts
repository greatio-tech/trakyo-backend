import mongoose, { Schema, Document } from 'mongoose';

export interface IOtp extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  otp: string;
  createdAt: Date;
}

const OtpSchema: Schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, index: { expires: '5m' } },
});

export default mongoose.model<IOtp>('Otp', OtpSchema);
