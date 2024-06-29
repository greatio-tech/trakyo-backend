import { Router } from 'express';
import { createNewOrder, handleOrderUpdate, fetchOrder, fetchUserOrders, handleDeliveryStatusUpdate } from '../controllers/orderController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/create', authMiddleware, createNewOrder);
router.post('/update', handleOrderUpdate);
router.post('/delivery-status', authMiddleware, handleDeliveryStatusUpdate);
router.get('/:id', authMiddleware, fetchOrder);
router.get('/', authMiddleware, fetchUserOrders);

export default router;
