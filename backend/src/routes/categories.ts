import { Router } from 'express';
import { getCategories } from '../controllers/categories.controller';

const router = Router();

router.get('/', getCategories);
// router.post();
// router.put();
// router.delete();

export default router;
