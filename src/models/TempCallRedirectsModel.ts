import mongoose from 'mongoose';

interface INumberSchema {
  countryCode: string;
  number: string;
}

interface ITemporaryCallRedirect extends Document {
  caller: INumberSchema;
  reciever: INumberSchema;
  virtualNumber: string;
  createdAt: Date;
}

const numberSubSchema = new mongoose.Schema<INumberSchema>({
  countryCode: { type: String, required: true },
  number: { type: String, required: true },
});
const tempCallRedirectSchema = new mongoose.Schema<ITemporaryCallRedirect>({
  caller: numberSubSchema,
  reciever: numberSubSchema,
  virtualNumber: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 900 } //  15 minutes
});

// Create a compound index
tempCallRedirectSchema.index({ 'caller.countryCode': 1,'caller.number': 1, virtualNumber: 1 },{unique:true});

const TemporaryCallRedirect = mongoose.model('TemporaryCallRedirect', tempCallRedirectSchema, 'TemporaryCallRedirects');

TemporaryCallRedirect.syncIndexes()
  .then(() => console.log('Indexes synchronized'))
  .catch((error) => console.error('Error synchronizing indexes:', error));


export default TemporaryCallRedirect;