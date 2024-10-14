import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { Button, Modal, ModalOverlay, ModalContent, VStack, Text, Link, useDisclosure, Box, Flex } from "@chakra-ui/react";
import { api } from "@fergeh/trpc";
import { keyframes } from "@emotion/react";

import { useTelemetry } from "../../lib/telemetry";
import { DefaultLayout } from "./default-layout";
import { PresentWrapper } from "./present-wrapper";

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

export const OnboardingDone = () => {
  const { event } = useTelemetry();
  const { update } = useSession();
  const router = useRouter();
  const callbackUrl = router.query.callbackUrl as string;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [startedLoading, setStartedLoading] = React.useState(false);

  const completeOnboarding = api.user.completeOnboarding.useMutation({
    onSuccess: async () => {
      void event("onboarding_completed", {});
      await update();
      // Navigate to the callback URL or a default page after successful completion
      router.push(callbackUrl || '/dashboard');
    },
    onError: async (error) => {
      console.error("Error completing onboarding:", error);
      // Handle error (e.g., show an error message to the user)
    },
  });

  const handleDone = async () => {
    onOpen();
  };

  const handleFollowDone = async () => {
    onClose();
    setStartedLoading(true);
    await completeOnboarding.mutateAsync();
  };

  return (
    <PresentWrapper>
      <DefaultLayout
        heading="هەموو شتێک ئامادەیە!"
        seoTitle="You're all set!"
        description="بو ئەکتیڤ کردنی وانەکان نامە بنێرە بو ئەکاونتەکانمان."
        action="Done"
        nextLoading={startedLoading}
        onNext={handleDone}
        defaultNext={false}
      >
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay backdropFilter="blur(10px)" />
          <ModalContent
            bg="transparent"
            boxShadow="none"
            borderRadius="xl"
            overflow="hidden"
            animation={`${fadeIn} 0.3s ease-out`}
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
                <Link href="https://www.tiktok.com/@fergeh.app" isExternal width="100%">
                  <Button colorScheme="blue" width="100%">
                    فۆڵۆمان بکەن لە تیکتۆک
                  </Button>
                </Link>
                <Link href="https://www.instagram.com/fergeh.app" isExternal width="100%">
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
      </DefaultLayout>
    </PresentWrapper>
  );
};
