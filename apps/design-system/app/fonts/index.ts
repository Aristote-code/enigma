import { Inter, Source_Code_Pro } from 'next/font/google'

// AlignUI uses Inter as its sans typeface. Exported as `customFont` and wired to
// the --font-custom variable so the rest of the app (layout, --font-sans) is unchanged.
export const customFont = Inter({
  subsets: ['latin'],
  variable: '--font-custom',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  fallback: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
})

export const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  fallback: ['Source Code Pro', 'Office Code Pro', 'Menlo', 'monospace'],
  variable: '--font-source-code-pro',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})
