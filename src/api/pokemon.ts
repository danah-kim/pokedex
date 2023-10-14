import type { Pokemon, PokemonSpecies } from '@/typings/pokemon';
import type { EvolutionChain } from '@/typings/pokemon-evolution';
import { http } from '@/utils/http';

export interface PokemonsRequest {
  offset: number;
  limit: number;
}

export const getPokemonByName = async (params: PokemonsRequest) => {
  return http.get<Pokemon[]>('/pokemon', { params });
};

export const getPokemonSpeciesByID = async (id: number) => {
  return http.get<PokemonSpecies>(`/pokemon-species/${id}`);
};

export const getEvolutionChainByID = async (id: number) => {
  return http.get<EvolutionChain>(`/evolution-chain/${id}`);
};
