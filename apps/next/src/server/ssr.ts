import type { GetServerSidePropsContext } from "next";
import { type AxiomAPIRequest, log } from "next-axiom";
import superjson from "superjson";

import { getServerAuthSession } from "@fergeh/auth";
import { createServerSideHelpers } from "@fergeh/trpc/react/server";
import { createContext } from "@fergeh/trpc/server/context";
import { appRouter } from "@fergeh/trpc/server/root";

export const ssrInit = async (context: GetServerSidePropsContext) => {
  const ctx = createContext({
    ...context,
    req: { ...context.req, log } as AxiomAPIRequest,
  });
  const session = await getServerAuthSession(context);

  const ssr = createServerSideHelpers({
    router: appRouter,
    transformer: superjson,
    ctx: {
      ...ctx,
      session: session ?? null,
    },
  });

  await ssr.user.me.prefetch();

  return ssr;
};
