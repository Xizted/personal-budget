import { z } from 'zod';

export const TypeSchema = z.enum(['income', 'expenses'], {
  invalid_type_error: 'Type is not valid',
  required_error: 'Type is required',
});
