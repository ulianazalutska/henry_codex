const fallbackSiteUrl = "https://henryseating.com";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || fallbackSiteUrl;

export const siteUrl = configuredSiteUrl.replace(/\/+$/, "");
