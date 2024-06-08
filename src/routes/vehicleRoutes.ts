import { Router } from 'express';
import { createVehicle, updateVehicle, removeVehicle, fetchVehicle, fetchUserVehicles } from '../controllers/vehicleController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware, createVehicle);
router.put('/:id', authMiddleware, updateVehicle);
router.delete('/:id', authMiddleware, removeVehicle);
router.get('/:id', authMiddleware, fetchVehicle);
router.get('/', authMiddleware, fetchUserVehicles);

export default router;
