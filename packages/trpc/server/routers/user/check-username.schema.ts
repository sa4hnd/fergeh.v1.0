import { z } from "zod";

import { USERNAME_REGEXP } from "@fergeh/lib/constants/characters";

export const ZCheckUsernameSchema = z.object({
  username: z.string().max(40).regex(USERNAME_REGEXP),
});

export type TCheckUsernameSchema = z.infer<typeof ZCheckUsernameSchema>;
