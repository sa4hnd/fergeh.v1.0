import { keyframes } from "@emotion/react";
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

export const OnboardingDone = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
  `;

  const followMutation = api.user.follow.useMutation({
    onSuccess: async () => {
      await router.push("/dashboard");
    },
    onError: async (error) => {
      console.error("Error following:", error);
      // Handle error appropriately
    },
  });

  const handleFollowDone = async () => {
    try {
      await followMutation.mutateAsync();
      onClose();
    } catch (error) {
      console.error("Error in handleFollowDone:", error);
      // Handle error appropriately
    }
  };

  React.useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
    <>
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
              <Link
                href="https://www.tiktok.com/@fergeh.app"
                isExternal
                width="100%"
              >
                <Button colorScheme="blue" width="100%">
                  فۆڵۆمان بکەن لە تیکتۆک
                </Button>
              </Link>
              <Link
                href="https://www.instagram.com/fergeh.app"
                isExternal
                width="100%"
              >
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
    </>
  );
};
