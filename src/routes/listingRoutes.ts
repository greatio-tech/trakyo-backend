import { Router } from 'express';
import { getQRCodes } from '../controllers/listingController';

const router = Router();

router.get('/', getQRCodes);

export default router;
