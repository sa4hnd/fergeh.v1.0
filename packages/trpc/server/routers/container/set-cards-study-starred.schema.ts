import { z } from "zod";

import { ContainerType } from "@fergeh/prisma/client";

export const ZSetCardsStudyStarredSchema = z.object({
  entityId: z.string(),
  type: z.nativeEnum(ContainerType),
  cardsStudyStarred: z.boolean(),
});

export type TSetCardsStudyStarredSchema = z.infer<
  typeof ZSetCardsStudyStarredSchema
>;
