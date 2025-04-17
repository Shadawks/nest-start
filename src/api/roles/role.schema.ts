import { z } from 'zod';

export const CreateRoleSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().optional(),
  isDefault: z.boolean().optional().default(false),
});

export const UpdateRoleSchema = CreateRoleSchema.partial();

export type CreateRoleDto = z.infer<typeof CreateRoleSchema>;
export type UpdateRoleDto = z.infer<typeof UpdateRoleSchema>;
