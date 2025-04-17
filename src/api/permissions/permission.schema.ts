import { z } from 'zod';

export const CreatePermissionSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().optional(),
  category: z.string().min(1),
});

export const UpdatePermissionSchema = CreatePermissionSchema.partial();

export type CreatePermissionDto = z.infer<typeof CreatePermissionSchema>;
export type UpdatePermissionDto = z.infer<typeof UpdatePermissionSchema>;
