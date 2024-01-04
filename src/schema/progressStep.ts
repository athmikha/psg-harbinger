import { z } from "zod";
import { reportStage } from "./report";

export const progressStepStatus = z.enum(["ACCEPTED", "DECLINED", "AWAITING"]);

export const progressStep = z.object({
  id: z.number(),
  status: progressStepStatus,
  currentStage: reportStage,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const progressComment = z.object({
  status:z.string(),
  comment:z.string().nullable(),
});
export type ProgressStep = z.infer<typeof progressStep>;
export type ProgressStepStatus = z.infer<typeof progressStepStatus>;
export type ProgressComment = z.infer<typeof progressComment>;