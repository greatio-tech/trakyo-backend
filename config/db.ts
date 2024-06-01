
import mongoose from 'mongoose';
import config from './config';

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }as any);
    console.log('MongoDB connected...');
  } catch (err: any) { 
    console.error((err as Error).message);
    process.exit(1);
  }
};

export default connectDB;
