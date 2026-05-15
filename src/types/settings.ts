export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  contactEmail: string;
  githubRepo: string;
  githubOwner: string;
  adminPassword: string;
  fontsPerPage: number;
  enableAiPairing: boolean;
  enableDownloads: boolean;
  enableLikes: boolean;
  enableRegistration: boolean;
  openrouterApiKey: string;
  openrouterModel: string;
  openrouterSiteUrl: string;
  openrouterSiteName: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    github?: string;
    youtube?: string;
  };
  seo: {
    ogImage: string;
    defaultKeywords: string[];
  };
  updatedAt: string;
}
