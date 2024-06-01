import { Router } from 'express';
import { addContact, getUser, updateUser } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/:id', authMiddleware, getUser);
router.put('/:id', authMiddleware, updateUser);
router.post('/:id/contacts', authMiddleware, addContact);

export default router;
