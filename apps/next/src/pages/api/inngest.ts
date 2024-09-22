import { functions, inngest } from "@fergeh/inngest";
import { serve } from "@fergeh/inngest/next";

export default serve({ client: inngest, functions });
