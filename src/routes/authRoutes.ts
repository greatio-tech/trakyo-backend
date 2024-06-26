import { Router } from 'express';
import { login, resend, verify } from '../controllers/authController';

const router = Router();

router.post('/login', login);
router.post('/verify', verify);
router.post('/resend', resend);

export default router;
