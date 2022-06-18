import { z } from 'zod';

export const ValidateLogin = z.object({
  email: z
    .string({
      invalid_type_error: 'Email is not valid',
      required_error: 'Email is requierd',
    })
    .email('Email is not valid'),
  password: z.string({
    invalid_type_error: 'Password is not valid',
    required_error: 'Password is required',
  }),
});
