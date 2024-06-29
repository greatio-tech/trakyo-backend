// import Razorpay from '../config/razorpay';
// import Order from '../models/orderModel';
// import { IOrder } from '../interfaces/OrderInterfaces';
// import mongoose from 'mongoose';

// export const createOrder = async (orderDetails: IOrder) => {
//   const { amount, currency, receipt, user, qrCodes } = orderDetails;
//   const options = {
//     amount: amount * 100, // Amount in paise
//     currency,
//     receipt,
//   };

//   const razorpayOrder = await Razorpay.orders.create(options);

//   const order = new Order({
//     user,
//     qrCodes: qrCodes.map(id => new mongoose.Types.ObjectId(id)),
//     amount,
//     currency,
//     receipt,
//     status: 'created',
//     deliveryStatus: 'pending',
//   });

//   await order.save();
//   return { order, razorpayOrder };
// };
// export const updateOrder = async (orderId: string, paymentId: string, status: string) => {
//   const order = await Order.findByIdAndUpdate(orderId, { paymentId, status }, { new: true });
//   if (!order) {
//     throw new Error('Order not found');
//   }
//   return order;
// };

// export const updateDeliveryStatus = async (orderId: string, deliveryStatus: string) => {
//   const order = await Order.findByIdAndUpdate(orderId, { deliveryStatus }, { new: true });
//   if (!order) {
//     throw new Error('Order not found');
//   }
//   return order;
// };

// // export const getOrder = async (orderId: string) => {
// //   const order = await Order.findById(orderId);
// //   if (!order) {
// //     throw new Error('Order not found');
// //   }
// //   return order;
// // };

// export const getOrder = async (orderId: string) => {
//   const order = await Order.findById(orderId).populate('qrCodes');
//   if (!order) {
//     throw new Error('Order not found');
//   }
//   return order;
// };

// // export const getUserOrders = async (userId: string) => {
// //   const orders = await Order.find({ user: userId });
// //   return orders;
// // };

// export const getUserOrders = async (userId: string) => {
//   const orders = await Order.find({ user: userId }).populate('qrCodes');
//   return orders;
// };

import Razorpay from '../config/razorpay';
import Order from '../models/orderModel';
import { IOrder } from '../interfaces/OrderInterfaces';
import mongoose from 'mongoose';

export const createOrder = async (orderDetails: IOrder) => {
  const { amount, currency, receipt, user, qrCodes } = orderDetails;
  const options = {
    amount: amount * 100, // Amount in paise
    currency,
    receipt,
  };

  const razorpayOrder = await Razorpay.orders.create(options);

  const order = new Order({
    user,
    qrCodes: qrCodes.map(id => new mongoose.Types.ObjectId(id)),
    amount,
    currency,
    receipt,
    status: 'created',
    deliveryStatus: 'pending',
  });

  await order.save();
  return { order, razorpayOrder };
};

export const updateOrder = async (orderId: string, paymentId: string, status: string) => {
  const order = await Order.findByIdAndUpdate(orderId, { paymentId, status }, { new: true });
  if (!order) {
    throw new Error('Order not found');
  }
  return order;
};

export const updateDeliveryStatus = async (orderId: string, deliveryStatus: string) => {
  const order = await Order.findByIdAndUpdate(orderId, { deliveryStatus }, { new: true });
  if (!order) {
    throw new Error('Order not found');
  }
  return order;
};

export const getOrder = async (orderId: string) => {
  const order = await Order.findById(orderId).populate('qrCodes');
  if (!order) {
    throw new Error('Order not found');
  }
  return order;
};

export const getUserOrders = async (userId: string) => {
  const orders = await Order.find({ user: userId }).populate('qrCodes');
  return orders;
};
