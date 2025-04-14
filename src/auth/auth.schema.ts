import { z } from 'zod';
import { CreateUserSchema } from '../api/users/user.schema';

export const RegisterSchema = CreateUserSchema;

export const LoginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(6),
});

export type LoginDto = z.infer<typeof LoginSchema>;
export type RegisterDto = z.infer<typeof RegisterSchema>;
