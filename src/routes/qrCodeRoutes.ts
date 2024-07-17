import { Router } from 'express';
import { getQRCode, createQRCodeEntry, updateQRCodeEntry, scanCode, uploadImage, fetchQRCodesByUser } from '../controllers/qrCodeController';
import upload from '../middlewares/uploadMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/:code', getQRCode);
router.get('/user/:userId', fetchQRCodesByUser);
router.post('/', createQRCodeEntry);
router.put('/:code', updateQRCodeEntry);
router.post('/:id/upload', upload.single('image'), uploadImage);
router.post('/scan/:code', scanCode);

export default router;
