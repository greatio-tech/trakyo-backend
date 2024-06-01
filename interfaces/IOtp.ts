import { Document } from 'mongoose';

export interface IOtp extends Document {
  userId: string;
  otp: string;
  createdAt: Date;
}
