import { z } from "zod";

import { UserType } from "@fergeh/prisma/client";

export const ZSetUserTypeSchema = z.object({
  type: z.nativeEnum(UserType),
});

export type TSetUserTypeSchema = z.infer<typeof ZSetUserTypeSchema>;
