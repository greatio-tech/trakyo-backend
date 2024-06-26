import { Request, Response } from 'express';
import { createOrder, updateOrder, getOrder, getUserOrders } from '../services/orderService';

export const createNewOrder = async (req: Request, res: Response) => {
  try {
    const orderDetails = req.body;
    orderDetails.user = req.user?.id ;
    const { order, razorpayOrder } = await createOrder(orderDetails);
    res.status(201).json({ order, razorpayOrder });
  } catch (error:any) {
    res.status(500).json({ message: error.message });
    console.log(error);
    
  }
};

export const handleOrderUpdate = async (req: Request, res: Response) => {
  try {
    const { orderId, paymentId, status } = req.body;
    const order = await updateOrder(orderId, paymentId, status);
    res.json(order);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id;
    const order = await getOrder(orderId);
    res.json(order);
  } catch (error:any) {
    res.status(404).json({ message: error.message });
  }
};

export const fetchUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as any;
    const orders = await getUserOrders(userId);
    res.json(orders);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};
