import { type PokemonsRequest } from '@/api/pokemon';

const pokemon = {
  all: ['pokemon'] as const,
  list: (params: PokemonsRequest) => [...pokemon.all, 'list', params] as const,
  item: (id: number) => [...pokemon.all, 'item', id] as const,
  types: () => [...pokemon.all, 'types'] as const,
  type: (id: number) => [...pokemon.all, 'type', id] as const,
  species: (id: number) => [...pokemon.all, 'species', id] as const,
  evolutionChain: (id: number) => [...pokemon.all, 'evolution-chain', id] as const,
};

const queryKeys = {
  pokemon,
};

export default queryKeys;
