import { sendProfileImportCompleteEmail } from "@fergeh/emails";
import { env } from "@fergeh/env/client";
import { prisma } from "@fergeh/prisma";

import { inngest } from "../inngest";

export const completeQuizletProfileImport = inngest.createFunction(
  {
    id: "complete-quizlet-profile-import",
    debounce: {
      period: "5m",
      key: "event.data.userId",
    },
    idempotency: "event.data.userId",
  },
  {
    event: "integrations/quizlet/complete-import-profile",
  },
  async ({ event, step }) => {
    const user = await step.run(
      "get-user",
      async () =>
        await prisma.user.findUniqueOrThrow({
          where: { id: event.data.userId },
          select: {
            email: true,
            username: true,
            image: true,
          },
        }),
    );

    await step.run("send-import-complete-email", async () => {
      await sendProfileImportCompleteEmail(user.email, {
        avatarUrl: user.image || "https://fergeh.io/avatars/fergeh.png",
        profileUrl: `${env.NEXT_PUBLIC_APP_URL}/@${user.username}`,
      });
    });
  },
);
