import { z } from 'zod';

export const HackathonZod = {
  Create: z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z
      .string()
      .min(10, 'Description must be at least 10 characters'),
    startDate: z.string(),
    endDate: z.string(),
    createdBy: z.string(),
  }),

  Update: z.object({
    id: z.string().cuid(),
    title: z.string().optional(),
    description: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  }),

  Get: z.object({
    id: z.string().cuid(),
  }),

  Delete: z.object({
    id: z.string().cuid(),
  }),
};
