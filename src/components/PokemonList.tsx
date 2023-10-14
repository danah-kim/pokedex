'use client';

import { useInfiniteQuery, useQueries, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useMemo } from 'react';

import { getPokemons, getPokemonTypeByID, getPokemonTypes } from '@/api/pokemon';
import queryKeys from '@/constants/queryKeys';
import usePokemonStore from '@/stores/pokemonStore';
import type { Type } from '@/typings/pokemon-type';

import PokemonCard from './PokemonCard';

const PokemonList = () => {
  const pokemonParams = usePokemonStore();

  const { isLoading: isLoadingTypes, data: { count: typeCount = 0, results = [] } = {} } = useQuery(
    {
      queryKey: queryKeys.pokemon.types(),
      queryFn: getPokemonTypes,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );
  const typeQueries = useQueries({
    queries:
      !isLoadingTypes && typeCount !== 0
        ? results.map(({ url }) => {
            const id = +url.substring(url.slice(0, -1).lastIndexOf('/') + 1).slice(0, -1);

            return {
              queryKey: queryKeys.pokemon.type(id),
              queryFn: () => getPokemonTypeByID(id),
              refetchOnWindowFocus: false,
              refetchOnMount: false,
            };
          })
        : [],
  });
  const { isLoading, data: { pages = [] } = {} } = useInfiniteQuery({
    queryKey: queryKeys.pokemon.list(pokemonParams),
    queryFn: ({ pageParam }) =>
      getPokemons({ ...pokemonParams, offset: pageParam || pokemonParams.offset }),
    refetchOnWindowFocus: false,
  });
  const types = useMemo(() => typeQueries.flatMap(({ data }) => data), [typeQueries]);
  const pokemons = useMemo(() => pages.flatMap((page) => page.results), [pages]);

  if (isLoading || types.some((type) => typeof type === 'undefined')) {
    return (
      <Image
        src="/assets/images/logo.svg"
        alt="Pokémon Logo"
        width="0"
        height="0"
        className="w-[200px] h-auto"
        priority
      />
    );
  }

  return (
    <section
      className="relative bg-gray-50 w-[256px] h-[173px] rounded-xl overflow-scroll select-none"
      onPointerDown={(e) => e.stopPropagation()}
    >
      <li className="py-5 px-4 flex flex-col gap-3">
        {pokemons.map(({ url, name }) => (
          <PokemonCard
            key={`pokemon-card-${name}`}
            id={+url.substring(url.slice(0, -1).lastIndexOf('/') + 1).slice(0, -1)}
            name={name}
            types={(types as Type[]).filter(({ pokemon }) =>
              pokemon.some(({ pokemon }) => pokemon.name === name),
            )}
          />
        ))}
      </li>
    </section>
  );
};

export default PokemonList;
