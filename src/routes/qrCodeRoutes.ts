import { Router } from 'express';
import { getQRCode, createQRCodeEntry, uploadImage, updateQRCodeEntry } from '../controllers/qrCodeController';
import upload from '../middlewares/uploadMiddleware';

const router = Router();

router.get('/:code', getQRCode);
router.post('/', createQRCodeEntry);
router.put('/:code', updateQRCodeEntry);
router.post('/upload', upload.single('image'), uploadImage);

export default router;
