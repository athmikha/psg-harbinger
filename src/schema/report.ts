import { z } from "zod";
import { department } from "./department";
import { progressStep } from "./progressStep";

export const reportContent = z.object({
  coverStory: z.string().nullable(),
  focusArticles : z.string().nullable(),
  worshops: z.string().nullable(),
  paperPresentations: z.string().nullable(),
  researchInitiatives : z.string().nullable(),
  awarnessProgram : z.string().nullable(),
  awards : z.string().nullable(),
  alumniEvents : z.string().nullable(),
  studentActivities: z.string().nullable(),
  exchangePrograms : z.string().nullable(),
  sports: z.string().nullable(),
});

export const reportUpdate = z.object({
  content: reportContent,
  id: z.number(),
});

export const reportStage = z.enum([
  "ACTION_FROM_REPRESENTATIVE",
  "ACTION_FROM_HOD",
  "ACTION_COMPLETED",
]);

export const report = z.object({
  id: z.number(),
  content: z.nullable(reportContent),
  quater: z.string().nullable(),
  stage: reportStage,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  department: z.nullable(department),
  progressSteps: z.array(progressStep),
});

export type Report = z.infer<typeof report>;
export type ReportUpdate = z.infer<typeof reportUpdate>;
export type ReportStage = z.infer<typeof reportStage>;
export type ReportContent = z.infer<typeof reportContent>;
