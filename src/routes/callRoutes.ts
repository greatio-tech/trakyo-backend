import { Router } from 'express';
import { connectCall, startCall } from '../controllers/callController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/start', startCall);
router.post('/connect',connectCall );
// router.post('/start', authMiddleware, startCall);


export default router;
