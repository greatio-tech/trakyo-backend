import { Router } from 'express';
import { getQRCode, createQRCodeEntry, updateQRCodeEntry, scanCode, uploadImage } from '../controllers/qrCodeController';
import upload from '../middlewares/uploadMiddleware';

const router = Router();

router.get('/:code', getQRCode);
router.post('/', createQRCodeEntry);
router.put('/:code', updateQRCodeEntry);
router.post('/:id/upload', upload.single('image'), uploadImage);
router.post('/scan/:code', scanCode);

export default router;
