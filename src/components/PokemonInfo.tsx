import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { memo, useState } from 'react';

import { getPokemonByID, getPokemonSpeciesByID } from '@/api/pokemon';
import queryKeys from '@/constants/queryKeys';
import usePokemonStore from '@/stores/pokemonStore';
import { pokemonHtml } from '@/utils/tunner';

import PokemonAbout from './pokemon/PokemonAbout';
import PokemonStats from './pokemon/PokemonStats';

const MENU = ['About', 'Stats', 'Evolutions'];

const PokemonInfo = () => {
  const { pokemonId } = usePokemonStore();

  const {
    isLoading: isLaodingPokemon,
    data: {
      height = 0,
      weight = 0,
      types: [{ type: { name: firstType = '' } = {} } = {}] = [],
      abilities: [{ ability: { name: firstAbility = '' } = {} } = {}] = [],
      stats = [],
    } = {},
  } = useQuery({
    queryKey: queryKeys.pokemon.item(pokemonId),
    queryFn: () => getPokemonByID(pokemonId),
    enabled: pokemonId > 0,
  });
  const {
    isLoading: isLoadingSpecies,
    data: { genera = [], evolution_chain: { url = '' } = {} } = {},
  } = useQuery({
    queryKey: queryKeys.pokemon.species(pokemonId),
    queryFn: () => getPokemonSpeciesByID(pokemonId),
    enabled: pokemonId > 0,
  });
  const category =
    genera.find(({ language }) => language.name === 'en')?.genus.replace(' Pokémon', '') || '';

  const [tab, setTab] = useState(0);
  const isLaoding = isLaodingPokemon || isLoadingSpecies;

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
    <pokemonHtml.In>
      <section
        className="relative bg-gray-50 w-[222px] h-[96px] rounded-md overflow-scroll select-none"
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
              onClick={() => setTab(index)}
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
        <div className="absolute top-9 w-full overflow-hidden">
          <Image
            className="ml-auto translate-x-4"
            src="/assets/icons/pokeball.svg"
            alt=""
            width={90}
            height={90}
            draggable={false}
          />
        </div>
      </section>
    </pokemonHtml.In>
  );
};

export default memo(PokemonInfo);
