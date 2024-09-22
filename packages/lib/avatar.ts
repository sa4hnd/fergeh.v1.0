import type { User } from "@fergeh/prisma/client";

/// Legacy
export const avatarUrl = (user: Pick<User, "username" | "image">): string =>
  user.image!;
