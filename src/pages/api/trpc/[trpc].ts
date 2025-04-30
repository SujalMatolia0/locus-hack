import { appRouter } from '@/server/root';
import { createTRPCContext } from '@/server/trpc';
import { createNextApiHandler } from '@trpc/server/adapters/next';
import { env } from 'process';

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === 'development'
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`
          );
        }
      : undefined,
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '300kb',
    },
  },
};
