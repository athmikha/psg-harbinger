import { z } from "zod";
import { userRole } from "./user";

export const registerUserSchema = z.object({
  employeeId: z.string(),
  role: userRole,
  departmentId: z.string(),
});

export const loginUserSchema = z.object({
  employeeId: z.string(),
  pwd: z.string(),
});

// z.object({
//   id : z.number(),
//   data : {
//     reportname: z.string(),
//   }
// })

// Prisma.report.update({
//   where: {
//     id : input.id
//   },
//   data : {
//     ...input.data
//   }
// })

export type RegisterUserSchema = z.infer<typeof registerUserSchema>;
export type LoginUserSchema = z.infer<typeof loginUserSchema>;
