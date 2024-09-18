import { z } from "zod";

import { UserType } from "@fergeh/prisma/client";

import { createTRPCRouter, devProcedure } from "../trpc";

export const devRouter = createTRPCRouter({
  setAccountType: devProcedure
    .input(z.nativeEnum(UserType))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: { type: input },
      });
    }),
});
