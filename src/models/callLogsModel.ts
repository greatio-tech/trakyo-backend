import mongoose from 'mongoose';

interface INumberSchema {
  countryCode: string;
  number: string;
}

interface ICallLogs extends Document {
  caller: INumberSchema;
  reciever: INumberSchema;
  virtualNumber: string;
  status: string;
  createdAt: Date;
  moreInfo:any
}

const numberSubSchema = new mongoose.Schema<INumberSchema>({
  countryCode: { type: String, required: true },
  number: { type: String, required: true },
});
const callLogsSchema = new mongoose.Schema<ICallLogs>({
  caller: numberSubSchema,
  reciever: numberSubSchema,
  virtualNumber: { type: String, required: true },
  status: {type:String},
  moreInfo: { type: Map, of: String }
},{
  timestamps:true
});


const callLogs = mongoose.model('callLog', callLogsSchema, 'callLogs');


export default callLogs;