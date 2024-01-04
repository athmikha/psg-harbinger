import { z } from "zod";

export const department = z.object({
  id: z.string(),
  name: z.string().nullable(),
  deadline: z.string().datetime().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Department = z.infer<typeof department>;
