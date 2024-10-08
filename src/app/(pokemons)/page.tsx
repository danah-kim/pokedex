import { dehydrate, Hydrate } from '@tanstack/react-query';
import React from 'react';

import { getPokemons, getPokemonTypeByID, getPokemonTypes } from '@/api/pokemon';
import queryKeys from '@/constants/queryKeys';
import { getPokemonIdFromUrl } from '@/utils/common';
import getQueryClient from '@/utils/getQueryClient';

import Pokemons from './_components/Pokemons';

export default async function Home() {
  const queryClient = getQueryClient();
  const pokemonParams = { offset: 0, limit: 20 };
  const queryClientList: Promise<void>[] = [];

  queryClientList.push(
    queryClient.prefetchQuery({
      queryKey: queryKeys.pokemon.list(pokemonParams),
      queryFn: () => getPokemons(pokemonParams),
    }),
  );

  const types = await queryClient.fetchQuery({
    queryKey: queryKeys.pokemon.types(),
    queryFn: getPokemonTypes,
  });
  queryClient.setQueryData(queryKeys.pokemon.types(), types);

  if (types.count !== 0) {
    types.results.forEach(({ url }) => {
      const id = getPokemonIdFromUrl(url);

      queryClientList.push(
        queryClient.prefetchQuery({
          queryKey: queryKeys.pokemon.type(id),
          queryFn: () => getPokemonTypeByID(id),
        }),
      );
    });
  }

  await Promise.allSettled(queryClientList);

  return (
    <Hydrate state={dehydrate(queryClient)}>
      <Pokemons />
    </Hydrate>
  );
}
