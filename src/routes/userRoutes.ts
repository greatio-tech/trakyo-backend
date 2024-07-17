import { Router } from 'express';
import {  getUser, updateUser } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/:id', authMiddleware, getUser);
router.put('/:id', authMiddleware, updateUser);
// router.post('/:id/contacts', authMiddleware, addContact);
// router.put('/:id', authMiddleware, upload.single('profilePicture'), updateUser);

export default router;
