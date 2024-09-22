import { env } from "@fergeh/env/client";

export const WEBSITE_URL = env.NEXT_PUBLIC_WEBSITE_URL || "https://fergeh.com";
export const APP_URL = env.NEXT_PUBLIC_APP_URL;
