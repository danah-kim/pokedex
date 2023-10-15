'use client';
import { useInfiniteQuery, useQueries, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import qs from 'qs';
import { memo, useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import { getPokemons, getPokemonTypeByID, getPokemonTypes } from '@/api/pokemon';
import queryKeys from '@/constants/queryKeys';
import usePokemonStore from '@/stores/pokemonStore';
import type { Type } from '@/typings/pokemon-type';
import { pokemonsHtml } from '@/utils/tunner';

import PokemonCard from './PokemonCard';

const PADDING_SIZE = 16;

const Pokemons = () => {
  const { pokemonsParams } = usePokemonStore();

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
    queryKey: queryKeys.pokemon.list(pokemonsParams),
    queryFn: ({ pageParam = pokemonsParams.offset }) =>
      getPokemons({ ...pokemonsParams, offset: pageParam }),
    getNextPageParam: ({ next }) => Number(qs.parse(next?.split('?')[1] || '').offset || 0),
    refetchOnWindowFocus: false,
  });
  const types = useMemo(() => typeQueries.flatMap(({ data }) => data), [typeQueries]);
  const pokemons = useMemo(() => pages.flatMap((page) => page.results), [pages]);
  const itemCount = hasNextPage ? pokemons.length + 1 : pokemons.length;

  const isItemLoaded = (index: number) => !hasNextPage || index < pokemons.length;

  const loadMoreItems = async () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading || types.some((type) => typeof type === 'undefined')) {
    return (
      <pokemonsHtml.In>
        <Image
          src="/assets/images/logo.svg"
          alt="Pokémon Logo"
          width="0"
          height="0"
          className="w-[200px] h-auto"
          priority
        />
      </pokemonsHtml.In>
    );
  }

  return (
    <pokemonsHtml.In>
      <section
        className="relative bg-gray-50 w-[256px] h-[173px] rounded-xl overflow-scroll select-none"
        onPointerDown={(e) => e.stopPropagation()}
      >
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
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
              itemSize={112}
              itemData={pokemons}
              itemCount={itemCount}
            >
              {({ index, style }) => {
                const { url = '', name = '' } = pokemons[index] || {};

                if (!isItemLoaded(index) || url.length === 0)
                  return (
                    <div className="relative flex flex-row h-[100px] bg-zinc-300 overflow-hidden opacity-70 mx-4 mt-5 rounded-2xl shadow-sm">
                      <Image
                        className="ml-auto translate-x-5 translate-y-5"
                        src={`/assets/icons/pokeball.svg`}
                        alt=""
                        width={90}
                        height={90}
                        draggable={false}
                        priority
                      />
                    </div>
                  );

                const pokeminId = +url
                  .substring(url.slice(0, -1).lastIndexOf('/') + 1)
                  .slice(0, -1);

                return (
                  <div
                    style={{
                      ...style,
                      top: +(style?.top || 0) + PADDING_SIZE - 4,
                      left: +(style?.left || 0) + PADDING_SIZE,
                      right: +(style?.right || 0) - PADDING_SIZE,
                      width: `calc(100% - ${PADDING_SIZE * 2}px)`,
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
    </pokemonsHtml.In>
  );
};

export default memo(Pokemons);
