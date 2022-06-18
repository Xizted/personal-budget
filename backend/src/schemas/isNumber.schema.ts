import { z } from 'zod';

export const IsNumber = z
  .string({
    invalid_type_error: 'Id is not valid',
  })
  .regex(/^\d+$/)
  .transform(Number);
