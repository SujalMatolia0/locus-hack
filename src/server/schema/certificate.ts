import { z } from 'zod';

export const CertificateZod = {
  Create: z.object({
    userId: z.string().cuid(),
    hackathonId: z.string().cuid(),
    certUrl: z.string().url(),
  }),

  Get: z.object({
    id: z.string().cuid(),
  }),

  List: z.object({
    hackathonId: z.string().cuid(),
  }),

  GetByUserAndHackathon: z.object({
    userId: z.string().cuid(),
    hackathonId: z.string().cuid(),
  }),

  Update: z.object({
    id: z.string().cuid(),
    certUrl: z.string().url().optional(),
  }),

  Delete: z.object({
    id: z.string().cuid(),
  }),
};
