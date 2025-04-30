import { prisma } from '@/server/db';
import { SubmissionZod } from '@/server/schema/submission';
import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from '@/server/trpc';
import { TRPCError } from '@trpc/server';

export const submissionRouter = createTRPCRouter({
  // ✅ Create Submission (Users only, but only if hackathon has started)
  create: publicProcedure
    .input(SubmissionZod.Create)
    .mutation(async ({ input }) => {
      // Fetch the hackathon details
      const hackathon = await prisma.hackathon.findUnique({
        where: { id: input.hackathonId },
      });

      if (!hackathon) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Hackathon not found.',
        });
      }

      // Check if the hackathon has started
      if (new Date() < new Date(hackathon.startDate)) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You cannot submit a solution before the hackathon starts.',
        });
      }

      // Check if the user already submitted for this question in this hackathon
      const existingSubmission = await prisma.submission.findFirst({
        where: {
          userId: input.userId,
          hackathonId: input.hackathonId,
          questionId: input.questionId,
        },
      });

      if (existingSubmission) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'You have already submitted a file for this question.',
        });
      }

      // Create a new submission if no existing one is found
      return await prisma.submission.create({
        data: {
          userId: input.userId,
          hackathonId: input.hackathonId,
          questionId: input.questionId,
          code: input.code,
        },
      });
    }),

  // ✅ List Submissions for a Hackathon (Admins only)
  list: adminProcedure.input(SubmissionZod.List).query(async ({ input }) => {
    return await prisma.submission.findMany({
      where: { hackathonId: input.hackathonId },
      include: {
        user: true,
        question: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }),

  // ✅ Get Submission by ID (Public API - only the owner can view)
  get: publicProcedure.input(SubmissionZod.Get).query(async ({ input }) => {
    const submission = await prisma.submission.findUnique({
      where: { id: input.id },
      include: {
        user: true,
        question: true,
      },
    });

    if (!submission) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Submission not found',
      });
    }

    return submission;
  }),

  // ✅ Update Submission (Users can update only their own submission)
  update: publicProcedure
    .input(SubmissionZod.Update)
    .mutation(async ({ input }) => {
      const existingSubmission = await prisma.submission.findUnique({
        where: { id: input.id },
      });

      if (!existingSubmission) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Submission not found',
        });
      }

      if (existingSubmission.userId !== input.userId) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only update your own submission',
        });
      }

      return await prisma.submission.update({
        where: { id: input.id },
        data: {
          code: input.code ?? undefined,
        },
      });
    }),

  // ✅ Delete Submission (Users can delete only their own submission)
  delete: publicProcedure
    .input(SubmissionZod.Delete)
    .mutation(async ({ input }) => {
      const existingSubmission = await prisma.submission.findUnique({
        where: { id: input.id },
      });

      if (!existingSubmission) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Submission not found',
        });
      }

      if (existingSubmission.userId !== input.userId) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only delete your own submission',
        });
      }

      return await prisma.submission.delete({
        where: { id: input.id },
      });
    }),
});
