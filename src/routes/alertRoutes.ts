import { Router } from 'express';
import { alertOwner } from '../controllers/alertController';
// import { authMiddleware } from '../middlewares/authMiddleware';
import upload from '../middlewares/uploadMiddleware';

const router = Router();

// router.post('/alert', authMiddleware, alertOwner);
// router.post('/alert', authMiddleware, upload.single('image'), alertOwner);
router.post('/alert', upload.single('image'), alertOwner);

export default router;
