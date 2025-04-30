import { prisma } from '@/server/db';
import { QuestionZod } from '@/server/schema/question';
import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from '@/server/trpc';
import { TRPCError } from '@trpc/server';

export const questionRouter = createTRPCRouter({
  // ✅ Create Question (Only Admins)
  create: adminProcedure
    .input(QuestionZod.Create)
    .mutation(async ({ input }) => {
      return await prisma.$transaction(async (tx) => {
        // 🚨 Validate hackathon existence
        const hackathonExists = await tx.hackathon.findUnique({
          where: { id: input.hackathonId },
        });

        if (!hackathonExists) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Hackathon not found.',
          });
        }

        // 🚨 Prevent duplicate question titles in the same hackathon
        const existingQuestion = await tx.question.findFirst({
          where: { title: input.title, hackathonId: input.hackathonId },
        });

        if (existingQuestion) {
          throw new TRPCError({
            code: 'CONFLICT',
            message:
              'A question with this title already exists in this hackathon.',
          });
        }

        // ✅ Create Question
        return await tx.question.create({
          data: {
            title: input.title,
            description: input.description,
            hackathonId: input.hackathonId,
          },
        });
      });
    }),

  // ✅ List Questions for a Hackathon (Public API)
  list: publicProcedure.input(QuestionZod.List).query(async ({ input }) => {
    return await prisma.$transaction(async (tx) => {
      // 🚨 Validate hackathon existence
      const hackathonExists = await tx.hackathon.findUnique({
        where: { id: input.hackathonId },
      });

      if (!hackathonExists) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Hackathon not found.',
        });
      }

      // ✅ Fetch questions
      return await tx.question.findMany({
        where: { hackathonId: input.hackathonId },
        orderBy: { createdAt: 'desc' },
      });
    });
  }),

  // ✅ Get Question by ID (Public API)
  get: publicProcedure.input(QuestionZod.Get).query(async ({ input }) => {
    if (!input.id) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Question ID is required.',
      });
    }

    const question = await prisma.question.findUnique({
      where: { id: input.id },
    });

    if (!question) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Question not found.',
      });
    }

    return question;
  }),

  // ✅ Update Question (Only Admins)
  update: adminProcedure
    .input(QuestionZod.Update)
    .mutation(async ({ input }) => {
      return await prisma.$transaction(async (tx) => {
        // 🚨 Validate question existence
        const question = await tx.question.findUnique({
          where: { id: input.id },
        });

        if (!question) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Question not found.',
          });
        }

        // 🚨 Prevent duplicate question titles in the same hackathon
        if (input.title) {
          const existingQuestion = await tx.question.findFirst({
            where: {
              title: input.title,
              hackathonId: question.hackathonId,
              id: { not: input.id },
            },
          });

          if (existingQuestion) {
            throw new TRPCError({
              code: 'CONFLICT',
              message:
                'A question with this title already exists in this hackathon.',
            });
          }
        }

        // ✅ Update Question
        return await tx.question.update({
          where: { id: input.id },
          data: {
            title: input.title ?? undefined,
            description: input.description ?? undefined,
          },
        });
      });
    }),

  // ✅ Delete Question (Only Admins)
  delete: adminProcedure
    .input(QuestionZod.Delete)
    .mutation(async ({ input }) => {
      return await prisma.$transaction(async (tx) => {
        // 🚨 Validate question existence
        const question = await tx.question.findUnique({
          where: { id: input.id },
        });

        if (!question) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Question not found.',
          });
        }

        // 🚨 Prevent deletion if submissions exist
        const hasSubmissions = await tx.submission.count({
          where: { questionId: input.id },
        });

        if (hasSubmissions > 0) {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'Cannot delete question with existing submissions.',
          });
        }

        // ✅ Delete Question
        return await tx.question.delete({ where: { id: input.id } });
      });
    }),
});
