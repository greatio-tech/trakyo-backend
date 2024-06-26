import { Router } from 'express';
import { createNewOrder, handleOrderUpdate, fetchOrder, fetchUserOrders } from '../controllers/orderController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/create', authMiddleware, createNewOrder);
router.post('/update', handleOrderUpdate);
router.get('/:id', authMiddleware, fetchOrder);
router.get('/', authMiddleware, fetchUserOrders);

export default router;
