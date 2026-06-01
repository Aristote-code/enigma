export const siteConfig = {
  name: 'Enigma Design System',
  url: 'https://enigma-design-system.netlify.app',
  ogImage: 'https://enigma-design-system.netlify.app/og.jpg',
  description: 'A modern, accessible React design system.',
  links: {
    twitter: 'https://twitter.com',
    github: 'https://github.com/Aristote-code/enigma/tree/main/apps/enigma',
    credits: {
      radix: 'https://www.radix-ui.com/themes/docs/overview/getting-started',
      shadcn: 'https://ui.shadcn.com/',
      geist: 'https://vercel.com/geist/introduction',
    },
  },
}

export type SiteConfig = typeof siteConfig
