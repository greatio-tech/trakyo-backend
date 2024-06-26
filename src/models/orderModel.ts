// import mongoose from 'mongoose';

// const orderSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
//     default: 'Pending',
//   },
//   qrCodes: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'QRCode',
//   }],
//   totalAmount: {
//     type: Number,
//     required: true,
//   },
//   paymentStatus: {
//     type: String,
//     enum: ['Pending', 'Completed', 'Failed'],
//     default: 'Pending',
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
  status: {
    type: String,
    required: true,
    enum: ['created', 'paid', 'failed'],
    default: 'created',
  },
  paymentId: {
    type: String,
    required: false,
  },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
