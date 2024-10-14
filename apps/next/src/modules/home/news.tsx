import { api } from "@fergeh/trpc";

import { Grid, Heading, Skeleton, Stack } from "@chakra-ui/react";

import { ClassesBeta } from "./news/v1.0.0/classes-beta";
import { IntroducingCortex } from "./news/v1.0.0/introducing-cortex";
import { Fergeh10 } from "./news/v1.0.0/quenti-1.0";
import { Images } from "./news/v1.2.0/images";

export const News = () => {
  const { data } = api.recent.get.useQuery();

  if (!data) return null;

  return (
    <Stack spacing={6}>
      <Skeleton isLoaded={!!data} rounded="md" fitContent>
        <Heading size="lg">چی نوویە</Heading>
      </Skeleton>
      <Grid templateColumns="repeat(auto-fill, minmax(256px, 1fr))" gap={4}>
        <Fergeh10 />
        <ClassesBeta />
        <IntroducingCortex />
        <Images />
      </Grid>
    </Stack>
  );
};
