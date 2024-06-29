// import mongoose from 'mongoose';

// const orderSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   amount: {
//     type: Number,
//     required: true,
//   },
//   currency: {
//     type: String,
//     required: true,
//     default: 'INR',
//   },
//   receipt: {
//     type: String,
//     required: true,
//   },
//   status: {
//     type: String,
//     required: true,
//     enum: ['created', 'paid', 'failed'],
//     default: 'created',
//   },
//   paymentId: {
//     type: String,
//     required: false,
//   },
// }, { timestamps: true });

// const Order = mongoose.model('Order', orderSchema);

// export default Order;


import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  qrCodes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QRCode',
    required: true,
  }],
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    default: 'INR',
  },
  receipt: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
    enum: ['created', 'paid', 'failed'],
    default: 'created',
  },
  deliveryStatus: {
    type: String,
    required: true,
    enum: ['pending', 'processing', 'shipped', 'delivered'],
    default: 'pending',
  },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;


