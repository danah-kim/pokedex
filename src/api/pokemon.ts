import type { Pokemon, PokemonSpecies } from '@/typings/pokemon';
import type { EvolutionChain } from '@/typings/pokemon-evolution';
import { http } from '@/utils/http';

export interface PokemonsRequest {
  offset: number;
  limit: number;
}

export interface PokemonsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

export const getPokemons = async (params: PokemonsRequest) => {
  return http.get<PokemonsRequest, PokemonsResponse>('/pokemon', { params });
};

export const getPokemonByName = async (name: string) => {
  return http.get<string, Pokemon>(`/pokemon/${name}`);
};

export const getPokemonSpeciesByID = async (id: number) => {
  return http.get<number, PokemonSpecies>(`/pokemon-species/${id}`);
};

export const getEvolutionChainByID = async (id: number) => {
  return http.get<number, EvolutionChain>(`/evolution-chain/${id}`);
};
