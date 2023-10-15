import type { NamedAPIResource } from '@/typings/common';
import type { Pokemon, PokemonSpecies, PokemonType } from '@/typings/pokemon';
import type { EvolutionChain } from '@/typings/pokemon-evolution';
import type { Type } from '@/typings/pokemon-type';
import { http } from '@/utils/http';

export interface PokemonsRequest {
  offset: number;
  limit: number;
}

export interface PokemonsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
}

export const getPokemons = async (params: PokemonsRequest) => {
  return http.get<PokemonsRequest, PokemonsResponse>('/pokemon', { params });
};

export const getPokemonByID = async (id: number) => {
  return http.get<string, Pokemon>(`/pokemon/${id}`);
};

export const getPokemonTypes = async () => {
  return http.get<undefined, PokemonsResponse>('/type');
};

export const getPokemonTypeByID = async (id: number) => {
  return http.get<number, Type>(`/type/${id}`);
};

export const getPokemonSpeciesByID = async (id: number) => {
  return http.get<number, PokemonSpecies>(`/pokemon-species/${id}`);
};

export const getPokemonEvolutionChainByID = async (id: number) => {
  return http.get<number, EvolutionChain>(`/evolution-chain/${id}`);
};
