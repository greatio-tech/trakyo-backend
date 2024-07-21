import { Router } from 'express';
import { initiateAdd } from '../controllers/vehicleController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/address-add', authMiddleware, initiateAdd);

export default router;