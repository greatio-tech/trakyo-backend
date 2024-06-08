import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  notifications: {
    type: Boolean,
    default: true,
  },
  theme: {
    type: String,
    enum: ['Light', 'Dark'],
    default: 'Light',
  },
}, { timestamps: true });

const Settings = mongoose.model('Settings', settingsSchema);

export default Settings;
