import { z } from "zod";

import { StudySetAnswerMode } from "@fergeh/prisma/client";

export const ZSetAnswerModeSchema = z.object({
  entityId: z.string(),
  answerWith: z.nativeEnum(StudySetAnswerMode),
});

export type TSetAnswerModeSchema = z.infer<typeof ZSetAnswerModeSchema>;
