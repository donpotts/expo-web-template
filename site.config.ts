export interface ServiceItem {
  title: string;
  description: string;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface SiteConfig {
  /** Display name shown in the header, footer, and app.json */
  siteName: string;
  /** URL-safe slug used for app.json "slug" and package.json "name" */
  slug: string;
  /** Short subtitle for the site (not rendered by default, reserved for meta tags) */
  tagline: string;
  /** Custom domain for GitHub Pages, e.g. "example.com". Leave "" to skip CNAME. */
  domain: string;

  colors: {
    accent: string;
    text: string;
    textMuted: string;
    textSubtle: string;
    background: string;
    surfaceAlt: string;
    border: string;
    dot: string;
  };

  hero: {
    title: string;
    subtitle: string;
  };

  about: {
    heading: string;
    body: string;
  };

  promo: {
    enabled: boolean;
    text: string;
    linkText: string;
    linkUrl: string;
  };

  services: {
    heading: string;
    items: ServiceItem[];
  };

  contact: {
    heading: string;
    phone: string;
    email: string;
  };

  footer: {
    text: string;
  };

  /** Optional, not rendered by default — reserved for future footer/social links */
  social?: SocialLink[];
}

const siteConfig: SiteConfig = {
  siteName: 'My Website',
  slug: 'my-website',
  tagline: 'A short tagline describing what this site is about.',
  domain: '',

  colors: {
    accent: '#0b57d0',
    text: '#111111',
    textMuted: '#333333',
    textSubtle: '#666666',
    background: '#ffffff',
    surfaceAlt: '#f5f5f5',
    border: '#eeeeee',
    dot: '#d1d5db',
  },

  hero: {
    title: 'Welcome to My Website',
    subtitle: 'A short, punchy line about what you do and who it helps.',
  },

  about: {
    heading: 'About Us',
    body: 'Replace this paragraph with a short description of your business, project, or organization. Talk about what makes you different and who you serve.',
  },

  promo: {
    enabled: false,
    text: 'Promote something here — an offer, a link, or an announcement.',
    linkText: 'Learn more',
    linkUrl: 'https://example.com',
  },

  services: {
    heading: 'Our Services',
    items: [
      { title: 'Service One', description: 'A short description of the first thing you offer.' },
      { title: 'Service Two', description: 'A short description of the second thing you offer.' },
      { title: 'Service Three', description: 'A short description of the third thing you offer.' },
      { title: 'Service Four', description: 'A short description of the fourth thing you offer.' },
    ],
  },

  contact: {
    heading: 'Contact Us',
    phone: '+1 (555) 555-5555',
    email: 'hello@example.com',
  },

  footer: {
    text: `© ${new Date().getFullYear()} My Website. All Rights Reserved.`,
  },
};

export default siteConfig;
