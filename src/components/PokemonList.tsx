'use client';
import { useInfiniteQuery, useQueries, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import qs from 'qs';
import { forwardRef, useMemo } from 'react';
import { type CommonProps, FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import { getPokemons, getPokemonTypeByID, getPokemonTypes } from '@/api/pokemon';
import queryKeys from '@/constants/queryKeys';
import usePokemonStore from '@/stores/pokemonStore';
import type { Type } from '@/typings/pokemon-type';

import PokemonCard from './PokemonCard';

const PADDING_SIZE = 20;

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
  const {
    isLoading,
    data: { pages = [] } = {},
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: queryKeys.pokemon.list(pokemonParams),
    queryFn: ({ pageParam }) =>
      getPokemons({ ...pokemonParams, offset: pageParam || pokemonParams.limit }),
    getNextPageParam: ({ next }) => Number(qs.parse(next?.split('?')[1] || '').offset || 0),
    refetchOnWindowFocus: false,
  });
  const types = useMemo(() => typeQueries.flatMap(({ data }) => data), [typeQueries]);
  const pokemons = useMemo(() => pages.flatMap((page) => page.results), [pages]);
  const itemCount = hasNextPage ? pokemons.length + 1 : pokemons.length;

  const loadMoreItems = async () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

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
      <InfiniteLoader
        isItemLoaded={(index) => !!pokemons[index]}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
      >
        {({ ref, onItemsRendered }) => (
          <List
            ref={ref}
            onItemsRendered={onItemsRendered}
            className="List"
            width={256}
            height={173}
            itemSize={120}
            itemData={pokemons}
            itemCount={itemCount}
          >
            {({ index, style }) => {
              const { url, name } = pokemons[index];
              const pokeminId = +url.substring(url.slice(0, -1).lastIndexOf('/') + 1).slice(0, -1);

              return (
                <div
                  style={{
                    ...style,
                    top: +(style?.top || 0) + PADDING_SIZE,
                    left: +(style?.left || 0) + PADDING_SIZE - 4,
                    right: +(style?.right || 0) - PADDING_SIZE + 4,
                    width: `calc(100% - ${(PADDING_SIZE - 4) * 2}px)`,
                  }}
                >
                  <PokemonCard
                    key={`pokemon-card-${name}`}
                    id={pokeminId}
                    name={name}
                    types={(types as Type[]).filter(({ pokemon }) =>
                      pokemon.some(({ pokemon }) => pokemon.name === name),
                    )}
                  />
                </div>
              );
            }}
          </List>
        )}
      </InfiniteLoader>
    </section>
  );
};

export default PokemonList;
