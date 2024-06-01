import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  email: String,
  dob: Date,
  emergencyContacts: [{
    name: String,
    phoneNumber: String,
  }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
