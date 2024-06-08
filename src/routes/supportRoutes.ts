import { Router } from 'express';
import { fetchSupportRequests, createSupport, updateSupport } from '../controllers/supportController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authMiddleware, fetchSupportRequests);
router.post('/', authMiddleware, createSupport);
router.put('/:id', authMiddleware, updateSupport);

export default router;
