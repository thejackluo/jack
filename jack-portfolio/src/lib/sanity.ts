export interface SiteSettings {
  siteTitle?: string;
  author?: {
    name?: string;
    bio?: string;
  };
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return null;
} 