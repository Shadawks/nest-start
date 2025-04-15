import { z } from 'zod';

export const CreateUserSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),

  theme: z.string().optional().default('light'),
  language: z.string().optional().default('en'),
});

export const UpdateUserSchema = CreateUserSchema.partial();

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
