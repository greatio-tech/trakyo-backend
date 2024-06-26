import { Router } from 'express';
import { getQRCode, createQRCodeEntry, updateQRCodeEntry, scanCode } from '../controllers/qrCodeController';

const router = Router();

router.get('/:code', getQRCode);
router.post('/', createQRCodeEntry);
router.put('/:code', updateQRCodeEntry);
router.get('/scan/:code', scanCode);

export default router;
