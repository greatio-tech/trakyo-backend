import mongoose from 'mongoose';

const supportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  issue: String,
  status: {
    type: String,
    enum: ['Open', 'Closed'],
    default: 'Open',
  },
  response: String,
}, { timestamps: true });

const Support = mongoose.model('Support', supportSchema);

export default Support;
