import { useQuery } from '@tanstack/react-query';
import { capitalize } from 'lodash-es';
import Image from 'next/image';
import Pokeball from 'public/assets/icons/bg/pokeball.svg';
import { memo, useEffect, useRef, useState } from 'react';

import { getPokemonByID, getPokemonEvolutionChainByID, getPokemonSpeciesByID } from '@/api/pokemon';
import queryKeys from '@/constants/queryKeys';
import usePokemonStore from '@/stores/pokemonStore';
import { getPokemonIdFromUrl } from '@/utils/common';
import { pokemonHtml, pokemonTypesHtml } from '@/utils/tunner';

import PokemonAbout from './PokemonAbout';
import PokemonEvolutions from './PokemonEvolutions';
import PokemonStats from './PokemonStats';

const MENU = ['About', 'Stats', 'Evolutions'];

const PokemonInfo = () => {
  const { pokemonId } = usePokemonStore();

  const {
    isLoading: isLaodingPokemon,
    data: {
      height = 0,
      weight = 0,
      name = '',
      types,
      types: [{ type: { name: firstType = '' } = {} } = {}] = [],
      abilities: [{ ability: { name: firstAbility = '' } = {} } = {}] = [],
      stats = [],
    } = {},
  } = useQuery({
    queryKey: queryKeys.pokemon.item(pokemonId),
    queryFn: () => getPokemonByID(pokemonId),
    enabled: pokemonId > 0,
    refetchOnWindowFocus: false,
  });
  const {
    isLoading: isLoadingSpecies,
    data: { genera = [], evolution_chain: { url = '' } = {} } = {},
  } = useQuery({
    queryKey: queryKeys.pokemon.species(pokemonId),
    queryFn: () => getPokemonSpeciesByID(pokemonId),
    enabled: pokemonId > 0,
    refetchOnWindowFocus: false,
  });
  const evolutionChainId = getPokemonIdFromUrl(url);
  const { data: { chain: evolutionChain } = {} } = useQuery({
    queryKey: queryKeys.pokemon.evolutionChain(evolutionChainId),
    queryFn: () => getPokemonEvolutionChainByID(evolutionChainId),
    enabled: evolutionChainId > 0,
    refetchOnWindowFocus: false,
  });
  const category =
    genera.find(({ language }) => language.name === 'en')?.genus.replace(' Pokémon', '') || '';

  const [tab, setTab] = useState(0);
  const pokemonInfoRef = useRef<HTMLElement | null>(null);
  const isLaoding = isLaodingPokemon || isLoadingSpecies;

  const handleClickTab = (index: number) => () => {
    setTab(index);
    pokemonInfoRef.current?.scrollTo({ top: 0 });
  };

  useEffect(() => {
    setTab(0);
    setTimeout(() => pokemonInfoRef.current?.scrollTo({ top: 0 }));
  }, [pokemonId]);

  if (pokemonId === 0) {
    return (
      <pokemonHtml.In>
        <section
          className="relative w-[222px] h-[96px] rounded-md flex justify-center items-center text-lg font-medium text-gray-500"
          onPointerDown={(e) => e.stopPropagation()}
        >
          Select a Pokémon
        </section>
      </pokemonHtml.In>
    );
  }

  return (
    <>
      <pokemonHtml.In>
        <section
          ref={pokemonInfoRef}
          className="relative bg-gray-50 w-[222px] h-[96px] rounded-md overflow-scroll"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <div role="tablist" className="z-10 flex h-7 items-center w-full">
            {MENU.map((name, index) => (
              <button
                key={`menu-${name}`}
                role="tab"
                aria-selected={tab === index}
                disabled={isLaoding}
                className={`w-1/3 h-full text-[10px] font-semibold transition-colors border-solid disabled:text-zinc-300
              ${
                tab === index
                  ? `text-pokemon-${firstType}-main border-pokemon-${firstType}-main border-b-2`
                  : 'border-b text-zinc-500'
              }`}
                onClick={handleClickTab(index)}
              >
                {name}
              </button>
            ))}
          </div>
          {isLaoding && (
            <div className="flex flex-col gap-1.5 pt-2.5 px-3 pb-3.5 z-10">
              {Array.from({ length: 4 }, (_, index) => (
                <div key={`skeleton-${index}`} className={`w-full h-5 bg-zinc-100 rounded-md`} />
              ))}
            </div>
          )}
          {!isLaoding && tab === 0 && (
            <PokemonAbout
              height={height}
              weight={weight}
              category={category}
              firstAbility={firstAbility}
            />
          )}
          {!isLaoding && tab === 1 && <PokemonStats stats={stats} />}
          {!isLaoding && tab === 2 && (
            <PokemonEvolutions name={name} evolutionChain={evolutionChain} />
          )}
          <div className="absolute top-9 w-full overflow-hidden">
            <Pokeball className="ml-auto translate-x-4 text-zinc-100 w-[90px] h-[90px]" />
          </div>
        </section>
      </pokemonHtml.In>
      <pokemonTypesHtml.In>
        <section
          className="relative w-[245px] h-[44px] flex justify-between gap-6"
          onPointerDown={(e) => e.stopPropagation()}
        >
          {types?.map(({ type: { name: pokemonType } }) => (
            <div
              key={`pokemon-type-${pokemonType}`}
              className={`bg-pokemon-${pokemonType}-bg rounded-md flex gap-2 items-center p-2.5 w-full max-w-[110px]`}
            >
              <div className={`bg-pokemon-${pokemonType}-main rounded-full p-1`}>
                <Image
                  src={`/assets/icons/type/${pokemonType}.svg`}
                  alt=""
                  width={12}
                  height={12}
                  draggable={false}
                />
              </div>
              <p className={`w-full font-semibold text-pokemon-${pokemonType}-main`}>
                {capitalize(pokemonType)}
              </p>
            </div>
          ))}
        </section>
      </pokemonTypesHtml.In>
    </>
  );
};

export default PokemonInfo;
