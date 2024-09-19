import { useSession } from "next-auth/react";
import NextLink from "next/link";
import React from "react";

import { Link } from "@fergeh/components";
import { outfit } from "@fergeh/lib/chakra-theme";
import { WEBSITE_URL } from "@fergeh/lib/constants/url";
import { EnabledFeature } from "@fergeh/lib/feature";

import {
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  IconBooks,
  IconChevronDown,
  IconCloudDownload,
  IconFolder,
  IconSchool,
} from "@tabler/icons-react";

import { Logo } from "../../../../../packages/components/logo";
import { useFeature } from "../../hooks/use-feature";
import { useMe } from "../../hooks/use-me";
import { MenuOption } from "../menu-option";
import { TeacherOnly } from "../teacher-only";

export interface LeftNavProps {
  onFolderClick: () => void;
  onImportClick: () => void;
  onClassClick: () => void;
}

export const LeftNav: React.FC<LeftNavProps> = ({
  onFolderClick,
  onImportClick,
  onClassClick,
}) => {
  const { data: session, status } = useSession()!;
  const { data: me } = useMe();

  const [menuOpen, setMenuOpen] = React.useState(false);


  const menuBg = useColorModeValue("white", "gray.800");

  return (
    <HStack as="nav" spacing="4" height="12">
      <Flex
        align="center"
        justify="space-between"
        className="nav-content__mobile"
      >
        <HStack
          as={Link}
          href={session?.user ? "/home" : WEBSITE_URL}
          rel="home"
          ml="2"
        >
          <Logo boxSize="24px" />
          <Heading
            as="p"
            fontSize="2xl"
            color="black"
            _dark={{
              color: "white",
            }}
            className="notranslate"
            fontFamily={outfit.style.fontFamily}
            fontWeight={700}
            lineHeight={1.33}
          >
            Fergeh
          </Heading>
        </HStack>
      </Flex>
      {session?.user && me && (
        <HStack display={["none", "none", "flex"]}>
          <Button
            as={Link}
            href="/home"
            variant="ghost"
            colorScheme="gray"
            fontWeight={700}
            fontSize="sm"
          >
            Home
          </Button>
          <Menu
            placement="bottom-start"
            isOpen={menuOpen}
            onOpen={() => setMenuOpen(true)}
            onClose={() => setMenuOpen(false)}
          >
            <MenuButton>
              <Button
                fontWeight={700}
                fontSize="sm"
                rightIcon={
                  <IconChevronDown
                    style={{
                      transition: "rotate ease-in-out 200ms",
                      rotate: menuOpen ? "180deg" : "0deg",
                    }}
                  />
                }
                as="div"
              >
                Create
              </Button>
            </MenuButton>
            <MenuList
              bg={menuBg}
              py={0}
              overflow="hidden"
              w="max"
              marginTop={2}
              shadow="lg"
            >
              <NextLink href="/create" passHref>
                <MenuOption icon={<IconBooks size={20} />} label="Study set" />
              </NextLink>
              <MenuOption
                icon={<IconCloudDownload size={20} />}
                label="Import from Quizlet"
                onClick={onImportClick}
              />
              <MenuDivider />
              <MenuOption
                icon={<IconFolder size={20} />}
                label="Folder"
                onClick={onFolderClick}
              />
              <TeacherOnly>
                <MenuOption
                  icon={<IconSchool size={20} />}
                  label="Class"
                  onClick={onClassClick}
                />
              </TeacherOnly>
            </MenuList>
          </Menu>
        </HStack>
      )}
      {status === "unauthenticated" && (
        <ButtonGroup display={["none", "none", "flex"]} spacing="0" ml="4">
          <LinkButton href={`${WEBSITE_URL}/features`}>Features</LinkButton>
          <LinkButton href={`${WEBSITE_URL}/organizations`}>
            Organizations
          </LinkButton>
          <LinkButton href={`${WEBSITE_URL}/pricing`}>Pricing</LinkButton>
        </ButtonGroup>
      )}
    </HStack>
  );
};

const LinkButton: React.FC<React.PropsWithChildren<{ href: string }>> = ({
  children,
  href,
}) => {
  return (
    <Button
      variant="ghost"
      colorScheme="gray"
      fontSize="md"
      color="gray.800"
      as={Link}
      href={href}
      _dark={{ color: "gray.200" }}
    >
      {children}
    </Button>
  );
};

export default LeftNav;
