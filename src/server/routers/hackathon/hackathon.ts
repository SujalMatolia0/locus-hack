import { TRPCError } from '@trpc/server';
import { prisma } from '../../db';
import { HackathonZod } from '../../schema/hackathon';
import { adminProcedure, createTRPCRouter, publicProcedure } from '../../trpc';

export const hackathonRouter = createTRPCRouter({
  // ✅ Create Hackathon (Only Admins)
  create: adminProcedure
    .input(HackathonZod.Create)
    .mutation(async ({ input }) => {
      return await prisma.$transaction(async (tx) => {
        // 🚨 Prevent duplicate hackathon names
        const existingHackathon = await tx.hackathon.findFirst({
          where: { title: input.title },
        });

        if (existingHackathon) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'Hackathon with this name already exists.',
          });
        }

        // 🚨 Validate date range
        const now = new Date();
        const startDate = new Date(input.startDate);
        const endDate = new Date(input.endDate);

        // 🚨 Prevent past start date
        if (startDate <= now) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Start date must be in the future.',
          });
        }

        if (startDate >= endDate) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Start date must be before the end date.',
          });
        }

        // 🚨 Prevent overlapping hackathons
        const overlappingHackathon = await tx.hackathon.findFirst({
          where: {
            OR: [{ startDate: { lte: endDate }, endDate: { gte: startDate } }],
          },
        });

        if (overlappingHackathon) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'Another hackathon is scheduled for this timeframe.',
          });
        }

        // ✅ Create Hackathon
        const hackathon = await tx.hackathon.create({
          data: {
            title: input.title,
            description: input.description,
            startDate,
            endDate,
            createdBy: input.createdBy,
          },
        });

        return hackathon;
      });
    }),

  // ✅ List Hackathons (Public API)
  list: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.hackathon.findMany({
      orderBy: { startDate: 'desc' },
    });
  }),

  // ✅ Get Hackathon by ID (Public API)
  get: publicProcedure.input(HackathonZod.Get).query(async ({ input }) => {
    if (!input.id) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Hackathon ID is required.',
      });
    }

    const hackathon = await prisma.hackathon.findUnique({
      where: { id: input.id },
      include: { questions: true, submissions: true },
    });

    if (!hackathon) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Hackathon not found.',
      });
    }

    return hackathon;
  }),

  // ✅ Update Hackathon (Only Admins)
  update: adminProcedure
    .input(HackathonZod.Update)
    .mutation(async ({ input }) => {
      return await prisma.$transaction(async (tx) => {
        // 🚨 Validate hackathon existence
        const hackathon = await tx.hackathon.findUnique({
          where: { id: input.id },
        });

        if (!hackathon) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Hackathon not found.',
          });
        }

        // 🚨 Prevent updating if submissions/certificates exist
        const hasSubmissions = await tx.submission.count({
          where: { hackathonId: input.id },
        });
        const hasCertificates = await tx.certificate.count({
          where: { hackathonId: input.id },
        });

        if (hasSubmissions || hasCertificates) {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message:
              'Cannot update hackathon that already has submissions or certificates.',
          });
        }

        // 🚨 Prevent duplicate name update
        if (input.title) {
          const existingHackathon = await tx.hackathon.findFirst({
            where: { title: input.title, id: { not: input.id } },
          });

          if (existingHackathon) {
            throw new TRPCError({
              code: 'CONFLICT',
              message: 'Hackathon with this name already exists.',
            });
          }
        }

        // 🚨 Validate date range
        const now = new Date();
        const startDate = input.startDate
          ? new Date(input.startDate)
          : hackathon.startDate;
        const endDate = input.endDate
          ? new Date(input.endDate)
          : hackathon.endDate;

        if (startDate <= now) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Start date must be in the future.',
          });
        }

        if (startDate >= endDate) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Start date must be before end date.',
          });
        }

        // 🚨 Prevent overlapping updates
        const overlappingHackathon = await tx.hackathon.findFirst({
          where: {
            id: { not: input.id },
            OR: [
              {
                startDate: { lte: endDate },
                endDate: { gte: startDate },
              },
            ],
          },
        });

        if (overlappingHackathon) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'Another hackathon is scheduled during this timeframe.',
          });
        }

        // ✅ Update Hackathon
        return await tx.hackathon.update({
          where: { id: input.id },
          data: {
            title: input.title ?? undefined,
            description: input.description ?? undefined,
            startDate: input.startDate ? new Date(input.startDate) : undefined,
            endDate: input.endDate ? new Date(input.endDate) : undefined,
          },
        });
      });
    }),

  // ✅ Delete Hackathon (Only Admins)
  delete: adminProcedure
    .input(HackathonZod.Delete)
    .mutation(async ({ input }) => {
      return await prisma.$transaction(async (tx) => {
        // 🚨 Validate hackathon existence
        const hackathon = await tx.hackathon.findUnique({
          where: { id: input.id },
        });

        if (!hackathon) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Hackathon not found.',
          });
        }

        // 🚨 Prevent deletion if hackathon has submissions or certificates
        const hasSubmissions = await tx.submission.count({
          where: { hackathonId: input.id },
        });
        const hasCertificates = await tx.certificate.count({
          where: { hackathonId: input.id },
        });

        if (hasSubmissions || hasCertificates) {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message:
              'Cannot delete hackathon with submissions or certificates.',
          });
        }

        // ✅ Delete Hackathon
        return await tx.hackathon.delete({ where: { id: input.id } });
      });
    }),
});
