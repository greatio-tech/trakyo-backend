import { Router } from 'express';
import { registerAdmin, login, generateCodes, getUsers, approveChange } from '../controllers/adminController';

const router = Router();

router.post('/register', registerAdmin);
router.post('/login', login);
router.post('/generate-codes', generateCodes);
router.get('/users', getUsers);
router.post('/approve-change', approveChange);

export default router;
