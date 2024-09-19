import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { WEBSITE_URL } from "@fergeh/lib/constants/url";
import { api } from "@fergeh/trpc";

import {
  Box,
  Button,
  ButtonGroup,
  Card,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

import { IconArrowRight, IconUpload } from "@tabler/icons-react";

import { PageWrapper } from "../../common/page-wrapper";
import { Loading } from "../../components/loading";
import { WizardLayout } from "../../components/wizard-layout";
import { useMe } from "../../hooks/use-me";
import { useUnauthedRedirect } from "../../hooks/use-unauthed-redirect";
import { getLayout } from "../../layouts/main-layout";
import { useTelemetry } from "../../lib/telemetry";
import { OrganizationLogo } from "../../modules/organizations/organization-logo";
import { ReauthMessage } from "../../modules/organizations/reauth-message";
import { useOrgLogoUpload } from "../../modules/organizations/use-org-logo-upload";

const schema = z.object({
  name: z
    .string()
    .nonempty({ message: "Enter a name" })
    .max(50, { message: "Name must be less than 50 characters" }),
});

type NewOrganizationFormInput = {
  name: string;
};

export default function NewOrganization() {
  const utils = api.useUtils();
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const { event } = useTelemetry();
  const { data: me } = useMe();

  const HARD_CODED_USERNAME = "sahindhamzani";
  const HARD_CODED_PASSWORD = "hemzany1";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useUnauthedRedirect();

  const sendEvent = (id: string, name: string) => {
    void event("org_created", { id, name });
  };

  const { file, setFile, onInputFile, uploadLogo } = useOrgLogoUpload({
    onComplete: async (orgId) => {
      sendEvent(orgId, create.variables?.name || "");
      await router.push(`/orgs/${orgId}/members-onboarding`);
      await invalidateUser();
    },
  });

  const invalidateUser = async () => {
    await update();
    await utils.user.me.invalidate();
  };

  const setUserType = api.user.setUserType.useMutation();

  const create = api.organizations.create.useMutation({
    onSuccess: async (data) => {
      if (!file) {
        sendEvent(data.id, data.name);
        await router.push(`/orgs/${data.id}/members-onboarding`);
        await invalidateUser();
        return;
      }
      await uploadLogo.mutateAsync({ orgId: data.id });
    },
    onError: (error) => {
      if (error.message === "name_profane") {
        newOrganizationFormMethods.setError("name", {
          type: "custom",
          message: "Profane organization names are not allowed",
        });
      }
    },
  });

  const newOrganizationFormMethods = useForm<NewOrganizationFormInput>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(schema),
  });

  const {
    formState: { errors },
  } = newOrganizationFormMethods;

  const onSubmit: SubmitHandler<NewOrganizationFormInput> = async (data) => {
    if (username === HARD_CODED_USERNAME && password === HARD_CODED_PASSWORD) {
      setIsAuthenticated(true);
      if (session?.user?.type === "Student") {
        await setUserType.mutateAsync({ type: "Teacher" });
      }
      await create.mutateAsync(data);
    } else {
      alert("Invalid username or password");
    }
  };

  useEffect(() => {
    if (me?.orgMembership) {
      void router.push(`/orgs/${me.orgMembership.organization.id}`);
    }
  }, [me?.orgMembership, router]);

  if (status !== "authenticated" || !me || me.orgMembership) return <Loading />;
  if (session?.user?.organizationId)
    return (
      <ReauthMessage
        title="You're already in an organization"
        message="Sign in with another school/work email to get started."
      />
    );
  if (session?.user?.isOrgEligible === false)
    return <ReauthMessage title="Manage your school with Fergeh" />;

  return (
    <WizardLayout
      title="Create a new organization"
      seoTitle="New Organization"
      description="Create an organization to manage teachers and students."
      steps={5}
      currentStep={0}
    >
      <form onSubmit={newOrganizationFormMethods.handleSubmit(onSubmit)}>
        <Card p="8" variant="outline" shadow="lg" rounded="xl">
          <Stack spacing="10">
            <Stack spacing="6">
              <HStack spacing="4">
                <Box
                  rounded="full"
                  minW="64px"
                  minH="64px"
                  bg="white"
                  border="solid 1px"
                  borderColor={file ? "white" : "gray.200"}
                  _dark={{
                    borderColor: file ? "gray.800" : "white",
                  }}
                  overflow="hidden"
                >
                  <OrganizationLogo
                    url={file ? (file as string) : undefined}
                    width={64}
                    height={64}
                    local
                  />
                </Box>
                <Stack spacing="2">
                  <FormLabel m="0" fontWeight={700} fontSize="sm">
                    Organization logo
                  </FormLabel>
                  <input
                    onInput={onInputFile}
                    style={{ display: "none" }}
                    type="file"
                    id="upload-logo-input"
                    accept="image/*"
                  />
                  <ButtonGroup
                    variant="outline"
                    colorScheme="gray"
                    size="sm"
                    fontSize="sm"
                  >
                    <label htmlFor="upload-logo-input">
                      <Button
                        as="span"
                        leftIcon={<IconUpload size={18} />}
                        cursor="pointer"
                      >
                        Upload image
                      </Button>
                    </label>
                    <Button isDisabled={!file} onClick={() => setFile(null)}>
                      Remove
                    </Button>
                  </ButtonGroup>
                  <Text color="gray.500" fontSize="xs">
                    Image files up to 10 MB (recommended 512px x 512px)
                  </Text>
                </Stack>
              </HStack>
              <Controller
                name="name"
                control={newOrganizationFormMethods.control}
                render={({ field: { value, onChange } }) => (
                  <FormControl isInvalid={!!errors.name}>
                    <FormLabel fontSize="sm" mb="10px">
                      Organization name
                    </FormLabel>
                    <Input
                      placeholder="Acme, Inc."
                      autoFocus
                      defaultValue={value}
                      onChange={onChange}
                    />
                    <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                  </FormControl>
                )}
              />
              <FormControl>
                <FormLabel fontSize="sm" mb="10px">
                  Username
                </FormLabel>
                <Input
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm" mb="10px">
                  Password
                </FormLabel>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
            </Stack>
            <ButtonGroup w="full">
              <Button
                variant="outline"
                w="full"
                onClick={() => {
                  void router.push(`${WEBSITE_URL}/organizations`);
                }}
                fontSize="sm"
              >
                Cancel
              </Button>
              <Button
                w="full"
                rightIcon={<IconArrowRight size="18" />}
                type="submit"
                isLoading={setUserType.isLoading || create.isLoading}
                fontSize="sm"
              >
                Continue
              </Button>
            </ButtonGroup>
          </Stack>
        </Card>
      </form>
    </WizardLayout>
  );
}

NewOrganization.PageWrapper = PageWrapper;
NewOrganization.getLayout = getLayout;
