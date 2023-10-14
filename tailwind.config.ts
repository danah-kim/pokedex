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
      colors: {
        pokemon: {
          normal: {
            main: '#919AA2',
            bg: '#F1F2F3',
          },
          fighting: {
            main: '#CE416B',
            bg: '#F8E9EE',
          },
          flying: {
            main: '#89AAE3',
            bg: '#F1F4FA',
          },
          poison: {
            main: 'B567CE',
            bg: '#F5EDF8',
          },
          ground: {
            main: '#D97845',
            bg: '#F9EFEA',
          },
          rock: {
            main: '#C5B78C',
            bg: '#F7F5F1',
          },
          bug: {
            main: '#91C12F',
            bg: '#F1F6E8',
          },
          ghost: {
            main: '#5269AD',
            bg: '#EBEDF4',
          },
          steel: {
            main: '#5A8EA2',
            bg: '#ECF1F3',
          },
          fire: {
            main: '#FF9D55',
            bg: '#FCF3EB',
          },
          water: {
            main: '#5090D6',
            bg: '#EBF1F8',
          },
          grass: {
            main: '#63BC5A',
            bg: '#EDF6EC',
          },
          electric: {
            main: '#F4D23C',
            bg: '#FBF8E9',
          },
          phychic: {
            main: '#FA7179',
            bg: '#FCEEEF',
          },
          ice: {
            main: '#73CEC0',
            bg: '#F1FBF9',
          },
          dragon: {
            main: '#0B6DC3',
            bg: '#E4EEF6',
          },
          dark: {
            main: '#5A5465',
            bg: '#ECEBED',
          },
          fairy: {
            main: '#EC8FE6',
            bg: '#FBF1FA',
          },
          unknown: {
            main: '#333333',
            bg: '#F1F2F3',
          },
          shadow: {
            main: '#E6E6E6',
            bg: '#F1F2F3',
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
