import { Router } from 'express';
import { login, refresh, resend, verify } from '../controllers/authController';

const router = Router();

router.post('/login', login);
router.post('/verify', verify);
router.post('/resend', resend);
router.post('/refresh', refresh);

export default router;
