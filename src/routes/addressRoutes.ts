import { Router } from 'express';
import { initiateAdd,initiateGet } from '../controllers/addressController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/address-add', initiateAdd);
router.get('/address-get', authMiddleware, initiateGet);

export default router;