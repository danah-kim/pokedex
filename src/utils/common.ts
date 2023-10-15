export const getRandomNum = (n: number) => Math.floor(Math.random() * n);

export const getPokemonId = (url: string) =>
  +url.substring(url.slice(0, -1).lastIndexOf('/') + 1).slice(0, -1);
