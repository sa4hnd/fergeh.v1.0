import { Redis } from "@upstash/redis";

import { env } from "@fergeh/env/server";

const redis = (() => {
  try {
    return Redis.fromEnv();
  } catch {
    return undefined;
  }
})();
const enabled = env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN;

export const cache = enabled ? redis : undefined;