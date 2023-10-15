export const getRandomNum = (n: number): number => Math.floor(Math.random() * n);

export const getPokemonIdFromUrl = (url: string): number =>
  +url.substring(url.slice(0, -1).lastIndexOf('/') + 1).slice(0, -1);
