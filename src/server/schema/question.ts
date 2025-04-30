import { z } from 'zod';

export const QuestionZod = {
  Create: z.object({
    hackathonId: z.string().cuid(),
    title: z.string().min(3),
    description: z.string().min(10),
  }),

  Get: z.object({
    id: z.string().cuid(),
  }),

  List: z.object({
    hackathonId: z.string().cuid(),
  }),

  Update: z.object({
    id: z.string().cuid(),
    title: z.string().min(3).optional(),
    description: z.string().min(10).optional(),
  }),

  Delete: z.object({
    id: z.string().cuid(),
  }),
};
