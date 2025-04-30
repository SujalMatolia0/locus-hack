import { z } from 'zod';

export const SubmissionZod = {
  Create: z.object({
    userId: z.string().cuid(),
    hackathonId: z.string().cuid(),
    questionId: z.string().cuid(),
    code: z.string().min(10).max(100000),
  }),

  Get: z.object({
    id: z.string().cuid(),
  }),

  List: z.object({
    hackathonId: z.string().cuid(),
  }),

  Update: z.object({
    id: z.string().cuid(),
    userId: z.string().cuid(),
    code: z.string().min(10).max(100000).optional(),
  }),

  Delete: z.object({
    id: z.string().cuid(),
    userId: z.string().cuid(),
  }),
};
