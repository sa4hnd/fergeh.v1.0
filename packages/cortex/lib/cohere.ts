import cohere from "cohere-ai";

import { env } from "@fergeh/env/server";

if (env.COHERE_API_KEY) cohere.init(env.COHERE_API_KEY);

export { cohere };
