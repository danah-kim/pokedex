import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'rotate-poke-ball': 'rotate-poke-ball ease-in-out 3s infinite',
      },
      keyframes: {
        'rotate-poke-ball': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      backgroundImage: {
        coast: "url('/assets/images/coast.jpg')",
        forest: "url('/assets/images/forest.jpg')",
        glacier: "url('/assets/images/glacier.jpg')",
      },
    },
  },
  plugins: [],
};
export default config;
