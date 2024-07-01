// import { Router } from 'express';
// import { createVehicle, updateVehicle, removeVehicle, fetchVehicle, fetchUserVehicles } from '../controllers/vehicleController';
// import { authMiddleware } from '../middlewares/authMiddleware';

// const router = Router();

// router.post('/', authMiddleware, createVehicle);
// router.put('/:id', authMiddleware, updateVehicle);
// router.delete('/:id', authMiddleware, removeVehicle);
// router.get('/:id', authMiddleware, fetchVehicle);
// router.get('/', authMiddleware, fetchUserVehicles);

// export default router;

import { Router } from 'express';
import { initiateAdd, confirmAdd, initiateEdit, confirmEdit, removeVehicle, fetchVehicle, fetchUserVehicles } from '../controllers/vehicleController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/initiate-add', authMiddleware, initiateAdd);
router.post('/confirm-add', authMiddleware, confirmAdd);
router.post('/initiate-edit/:id', authMiddleware, initiateEdit);
router.post('/confirm-edit', authMiddleware, confirmEdit);
router.delete('/:id', authMiddleware, removeVehicle);
router.get('/:id', authMiddleware, fetchVehicle);
router.get('/', authMiddleware, fetchUserVehicles);

export default router;

