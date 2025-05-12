import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: '#00c4b4',
      },
      typography: {
        DEFAULT: {
          css: {
            h1: { fontSize: '2.25rem' }, // Match GitHub’s <h1> size
            blockquote: { fontStyle: 'normal' }, // Remove italics like GitHub
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;