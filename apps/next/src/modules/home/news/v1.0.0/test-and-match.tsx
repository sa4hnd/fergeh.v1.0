import { Box, Center, GridItem, HStack } from "@chakra-ui/react";

import { IconLayersSubtract, IconPlus, IconReport } from "@tabler/icons-react";

import { NewsCard } from "../../news-card";

export const TestAndMatch = () => {
  return (
    <GridItem>
      <NewsCard
        title="یاریبکە و خوت تاقیبکە"
        description=" بخوینە لە گەل تاقیکردنەکانی بێ سنوور و یاری بکە لە گەل هاورێکانتان"
        image={
          <Center overflow="hidden" w="full" h="full" position="relative">
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              w="100px"
              h="100px"
              rounded="full"
              bg="blue.300"
              filter="blur(60px)"
            />
            <HStack
              zIndex={10}
              color="blue.700"
              _dark={{
                color: "blue.100",
              }}
            >
              <IconReport size={36} />
              <IconPlus size={30} opacity={0.75} />
              <IconLayersSubtract size={36} />
            </HStack>
          </Center>
        }
      />
    </GridItem>
  );
};
