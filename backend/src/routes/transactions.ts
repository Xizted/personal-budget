import { Router } from 'express';
import {
  createTransaction,
  deletedTransactions,
  getTransactions,
  updatedTransactions,
} from '../controllers/transactions.controller';

const router = Router();

router.get('/', getTransactions);
router.post('/', createTransaction);
router.put('/:id', updatedTransactions);
router.delete('/:id', deletedTransactions);

export default router;
