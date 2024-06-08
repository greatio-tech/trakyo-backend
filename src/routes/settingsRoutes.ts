import { Router } from 'express';
import { fetchSettings, updateSettings } from '../controllers/settingsController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authMiddleware, fetchSettings);
router.put('/', authMiddleware, updateSettings);

export default router;
