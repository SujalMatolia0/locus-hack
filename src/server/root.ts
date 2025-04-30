import { certificateRouter } from './routers/certificate/certificate';
import { hackathonRouter } from './routers/hackathon/hackathon';
import { questionRouter } from './routers/question/question';
import { submissionRouter } from './routers/submission/submission';
import { createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
  hackathon: hackathonRouter,
  question: questionRouter,
  submission: submissionRouter,
  certificate: certificateRouter,
});

export type AppRouter = typeof appRouter;
