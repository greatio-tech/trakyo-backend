import { Router } from 'express';
import { initiateAdd,initiateDelete,initiateEdit,initiateGet } from '../controllers/addressController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/address-add',authMiddleware, initiateAdd);
router.get('/address-get', authMiddleware, initiateGet);
router.put('/address-edit/:addressId', authMiddleware, initiateEdit);
router.delete('/address-delete/:addressId', authMiddleware, initiateDelete);

export default router;