import type { OrganizationDomainType } from "@fergeh/prisma/client";

export const getBaseDomain = <T extends { type: OrganizationDomainType }>(
  org: { domains: T[] } | undefined,
) => {
  return org?.domains.find((domain) => domain.type == "Base");
};
