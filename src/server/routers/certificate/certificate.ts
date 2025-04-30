import { prisma } from '@/server/db';
import { CertificateZod } from '@/server/schema/certificate';
import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from '@/server/trpc';
import { TRPCError } from '@trpc/server';

export const certificateRouter = createTRPCRouter({
  // ✅ Create Certificate (Only Admins) - Supports Bulk Upload
  create: adminProcedure
    .input(CertificateZod.Create.array())
    .mutation(async ({ input }) => {
      const createdCertificates = [];
      for (const cert of input) {
        // Prevent duplicate certificate entries
        const existingCert = await prisma.certificate.findFirst({
          where: {
            userId: cert.userId,
            hackathonId: cert.hackathonId,
          },
        });

        if (existingCert) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: `Certificate already exists for user ${cert.userId} in this hackathon.`,
          });
        }

        const newCert = await prisma.certificate.create({
          data: {
            userId: cert.userId,
            hackathonId: cert.hackathonId,
            certUrl: cert.certUrl,
          },
        });
        createdCertificates.push(newCert);
      }
      return createdCertificates;
    }),

  // ✅ List Certificates for a Hackathon (Public API)
  list: publicProcedure.input(CertificateZod.List).query(async ({ input }) => {
    return await prisma.certificate.findMany({
      where: { hackathonId: input.hackathonId },
      include: {
        user: true,
        hackathon: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }),

  // ✅ Get Certificate by ID (Public API)
  get: publicProcedure.input(CertificateZod.Get).query(async ({ input }) => {
    const certificate = await prisma.certificate.findUnique({
      where: { id: input.id },
      include: {
        user: true,
        hackathon: true,
      },
    });

    if (!certificate) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Certificate not found',
      });
    }

    return certificate;
  }),

  // ✅ Get Certificate by User & Hackathon (For User Dashboard)
  getByUserAndHackathon: publicProcedure
    .input(CertificateZod.GetByUserAndHackathon)
    .query(async ({ input }) => {
      return (
        (await prisma.certificate.findFirst({
          where: {
            userId: input.userId,
            hackathonId: input.hackathonId,
          },
        })) ?? null
      );
    }),

  // ✅ Update Certificate (Only Admins)
  update: adminProcedure
    .input(CertificateZod.Update)
    .mutation(async ({ input }) => {
      const existingCert = await prisma.certificate.findUnique({
        where: { id: input.id },
      });

      if (!existingCert) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Certificate not found',
        });
      }

      return await prisma.certificate.update({
        where: { id: input.id },
        data: {
          certUrl: input.certUrl ?? undefined,
        },
      });
    }),

  // ✅ Delete Certificate (Only Admins)
  delete: adminProcedure
    .input(CertificateZod.Delete)
    .mutation(async ({ input }) => {
      const existingCert = await prisma.certificate.findUnique({
        where: { id: input.id },
      });

      if (!existingCert) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Certificate not found',
        });
      }

      return await prisma.certificate.delete({
        where: { id: input.id },
      });
    }),
});
