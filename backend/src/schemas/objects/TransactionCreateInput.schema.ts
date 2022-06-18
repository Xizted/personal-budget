import { z } from 'zod';
import { TypeSchema } from '../enums/Type.schema';

export const TransactionCreateInputObjectSchema = z.object({
  concept: z.string({
    invalid_type_error: 'Concept is not valid',
    required_error: 'Concept is required',
  }),
  amount: z.number({
    invalid_type_error: 'Amount is not valid',
    required_error: 'Amount is required',
  }),
  date: z.string({
    invalid_type_error: 'Date is not valid',
    required_error: 'Date is required',
  }),
  type: TypeSchema,
  categoryId: z.number({
    invalid_type_error: 'CategoryID is not valid',
    required_error: 'CategoryID is required',
  }),
});
