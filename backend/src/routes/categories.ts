import { Router } from 'express';
import { getCategories } from '../controllers/categories.controller';
import verifyToken from '../middleware/verifyToken';

const router = Router();

router.get('/', getCategories);

export default router;
