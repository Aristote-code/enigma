import { withContentlayer } from 'next-contentlayer2'

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '/enigma'
// The docs site is fully static (every route is Static/SSG). When STATIC_EXPORT
// is set (Netlify build), emit a plain static export so deployment needs no
// serverless runtime or Netlify Blobs.
const STATIC_EXPORT = process.env.STATIC_EXPORT === 'true'

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['ui', 'ui-patterns', 'icons', 'tsconfig'],
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '/enigma',
  ...(STATIC_EXPORT ? { output: 'export' } : {}),
  images: {
    unoptimized: STATIC_EXPORT,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
      },
    ],
  },
  // redirects() is unsupported with output: 'export'. In production BASE_PATH is
  // empty (served at root), so no redirect is needed there anyway.
  ...(STATIC_EXPORT
    ? {}
    : {
        async redirects() {
          return [
            ...(BASE_PATH.length
              ? [
                  {
                    source: '/',
                    destination: BASE_PATH,
                    basePath: false,
                    permanent: false,
                  },
                ]
              : []),
          ]
        },
      }),
  // Turbopack configuration to handle .md files with raw-loader
  // This mirrors the webpack configuration added by withContentlayer
  // and ensures both bundlers can process content files properly
  turbopack: {
    rules: {
      '*.md': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
    },
  },
}

export default withContentlayer(nextConfig)
