import { type PokemonsRequest } from '@/api/pokemon';

const pokemon = {
  all: ['pokemon'] as const,
  list: (params: PokemonsRequest) => [...pokemon.all, 'list', params] as const,
  item: (name: string) => [...pokemon.all, 'item', name] as const,
  species: (id: number) => [...pokemon.all, 'species', id] as const,
  evolutionChain: (id: number) => [...pokemon.all, 'evolution-chain', id] as const,
};

const queryKeys = {
  pokemon,
};

export default queryKeys;
