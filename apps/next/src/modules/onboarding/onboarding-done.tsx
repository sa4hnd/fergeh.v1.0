import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

import { Link } from "@fergeh/components";
import { api } from "@fergeh/trpc";

import {
  Box,
  Button,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";

import { useTelemetry } from "../../lib/telemetry";
import { PresentWrapper, useNextStep } from "./present-wrapper";

export const OnboardingDone = () => {
  const { event } = useTelemetry();
  const { data: session, update } = useSession();
  const router = useRouter();
  const callbackUrl = router.query.callbackUrl as string;
  const next = useNextStep();

  const [startedLoading, setStartedLoading] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const completeOnboarding = api.user.completeOnboarding.useMutation({
    onSuccess: async () => {
      void event("onboarding_completed", {});
      await update();
      onOpen(); // Open the modal after completing onboarding
    },
    onError: async () => {
      await router.replace({
        pathname: `/onboarding/username`,
        query: {
          returnUrl: "/onboarding/done",
          callbackUrl,
        },
      });
    },
  });

  React.useEffect(() => {
    if (!session?.user?.completedOnboarding) return;
    next();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.completedOnboarding]);

  const handleFollowDone = async () => {
    try {
      onClose();
      await router.push(callbackUrl || "/dashboard");
    } catch (error) {
      console.error("Error in handleFollowDone:", error);
      // Handle error appropriately
    }
  };

  return (
    <PresentWrapper>
      <Box>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          You&apos;re all set!
        </Text>
        <Text mb={6}>
          That&apos;s everything for now, you&apos;re ready to start using
          Fergeh.
        </Text>
        <Button
          colorScheme="blue"
          onClick={async () => {
            setStartedLoading(true);
            await completeOnboarding.mutateAsync();
          }}
          isLoading={startedLoading}
        >
          Done
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent
          bg="transparent"
          boxShadow="none"
          borderRadius="xl"
          overflow="hidden"
        >
          <Box
            bg="linear-gradient(135deg, rgba(59, 130, 246, 0.6), rgba(147, 51, 234, 0.6))"
            backdropFilter="blur(10px)"
            borderRadius="xl"
            p={6}
            textAlign="center"
          >
            <Text fontSize="2xl" fontWeight="bold" mb={4} color="white">
              لە سۆشیال میدیا فۆڵۆومان بکەن!
            </Text>
            <Text mb={6} color="white">
              بو ئەکتیڤ کردنی تەواوی بەندەکان نامە بو تیمەکەمان بنێرە.
            </Text>
            <VStack spacing={4} width="100%">
              <Link href="https://www.tiktok.com/@fergeh.app" width="100%">
                <Button colorScheme="blue" width="100%">
                  فۆڵۆمان بکەن لە تیکتۆک
                </Button>
              </Link>
              <Link href="https://www.instagram.com/fergeh.app" width="100%">
                <Button colorScheme="blue" width="100%">
                  فۆڵۆمان بکەن لە ئینستاگرام
                </Button>
              </Link>
            </VStack>
            <Flex justifyContent="center" mt={6}>
              <Button colorScheme="blue" onClick={handleFollowDone} px={8}>
                تەواو
              </Button>
            </Flex>
          </Box>
        </ModalContent>
      </Modal>
    </PresentWrapper>
  );
};
