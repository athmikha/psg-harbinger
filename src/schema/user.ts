import { z } from "zod";
import { department } from "./department";

export const userRole = z.enum(["REPRESENTATIVE", "HOD", "ADMIN"]);

export const user = z.object({
  employeeId: z.string(),
  role: userRole,
  department: department,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const jwtPayload = z.object({
  employeeId: z.string(),
  name: z.string(),
  department:  z.string(),
  role: userRole,
  iat: z.date(),
  updatedAt: z.date(),
});

export type UserRole = z.infer<typeof userRole>;
export type User = z.infer<typeof user>;
export type JwtPayload = z.infer<typeof jwtPayload>;
