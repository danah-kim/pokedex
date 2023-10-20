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
            main: '#B567CE',
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
          psychic: {
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
      backgroundImage: {
        normal: 'linear-gradient(0deg, #919AA2 35.77%, rgba(145, 154, 162, 0.50) 88.68%)',
        fighting: 'linear-gradient(0deg, #CE416B 35.77%, rgba(206, 65, 107, 0.50) 88.68%)',
        flying: 'linear-gradient(0deg, #89AAE3 35.77%, rgba(137, 170, 227, 0.50) 88.68%)',
        poison: 'linear-gradient(0deg, #B567CE 35.77%, rgba(181, 103, 206, 0.50) 88.68%)',
        ground: 'linear-gradient(0deg, #D97845 35.77%, rgba(217, 120, 69, 0.50) 88.68%)',
        rock: 'linear-gradient(0deg, #C5B78C 35.77%, rgba(197, 183, 140, 0.50) 88.68%)',
        bug: 'linear-gradient(0deg, #91C12F 35.77%, rgba(145, 193, 47, 0.50) 88.68%)',
        ghost: 'linear-gradient(0deg, #5269AD 35.77%, rgba(82, 105, 173, 0.50) 88.68%)',
        steel: 'linear-gradient(0deg, #5A8EA2 35.77%, rgba(90, 142, 162, 0.50) 88.68%)',
        fire: 'linear-gradient(0deg, #FF9D55 35.77%, rgba(255, 157, 85, 0.50) 88.68%)',
        water: 'linear-gradient(0deg, #5090D6 35.77%, rgba(80, 144, 214, 0.50) 88.68%)',
        grass: 'linear-gradient(0deg, #63BC5A 35.77%, rgba(99, 188, 90, 0.50) 88.68%)',
        electric: 'linear-gradient(0deg, #F4D23C 35.77%, rgba(244, 210, 60, 0.50) 88.68%)',
        psychic: 'linear-gradient(0deg, #FA7179 35.77%, rgba(250, 113, 121, 0.50) 88.68%)',
        ice: 'linear-gradient(0deg, #73CEC0 35.77%, rgba(115, 206, 192, 0.50) 88.68%)',
        dragon: 'linear-gradient(0deg, #0B6DC3 35.77%, rgba(11, 109, 195, 0.50) 88.68%)',
        dark: 'linear-gradient(0deg, #5A5465 35.77%, rgba(90, 84, 101, 0.50) 88.68%)',
        fairy: 'linear-gradient(0deg, #EC8FE6 35.77%, rgba(236, 143, 230, 0.50) 88.68%)',
      },
      imageRendering: {
        pixelated: 'pixelated',
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern:
        /(bg|text|border)-(pokemon)-(normal|fighting|flying|poison|ground|rock|bug|ghost|steel|fire|water|grass|electric|psychic|ice|dragon|dark|fairy|unknown|shadow)-(main|bg|gradient)/,
    },
    {
      pattern:
        /bg-(normal|fighting|flying|poison|ground|rock|bug|ghost|steel|fire|water|grass|electric|psychic|ice|dragon|dark|fairy|unknown|shadow)/,
    },
  ],
};
export default config;
