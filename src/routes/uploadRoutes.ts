import { Router } from 'express';
import { uploadImage } from '../controllers/uploadController';
import upload from '../middlewares/uploadMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/image', authMiddleware, upload.single('image'), uploadImage);

export default router;
