import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { capitalize } from 'lodash-es';
import Image from 'next/image';
import Pokeball from 'public/assets/icons/bg/pokeball.svg';
import ChevronLeft from 'public/assets/icons/chevron-left.svg';
import { memo } from 'react';

import { getPokemonByID, getPokemonSpeciesByID } from '@/api/pokemon';
import { POKEMON_IMAGES } from '@/constants/config';
import queryKeys from '@/constants/queryKeys';
import usePokemonStore from '@/stores/pokemonStore';
import { pokemonModalHtml } from '@/utils/tunner';

const Pokemon = () => {
  const { pokemonId, setPokemonId } = usePokemonStore();

  const {
    isLoading: isLaodingPokemon,
    data: { name = '', types: [{ type: { name: firstType = '' } = {} } = {}] = [] } = {},
  } = useQuery({
    queryKey: queryKeys.pokemon.item(pokemonId),
    queryFn: () => getPokemonByID(pokemonId),
    enabled: pokemonId > 0,
    refetchOnWindowFocus: false,
  });
  const { isLoading: isLoadingSpecies, data: { flavor_text_entries = [] } = {} } = useQuery({
    queryKey: queryKeys.pokemon.species(pokemonId),
    queryFn: () => getPokemonSpeciesByID(pokemonId),
    enabled: pokemonId > 0,
    refetchOnWindowFocus: false,
  });

  const flavorText =
    flavor_text_entries?.find(({ language }) => language.name === 'en')?.flavor_text || '';

  return (
    <pokemonModalHtml.In>
      <motion.div
        className={`absolute inset-0 bg-gray-50 w-[256px] h-[173px] rounded-xl overflow-scroll select-none z-20`}
        animate={pokemonId > 0 && !isLaodingPokemon && !isLoadingSpecies ? 'open' : 'closed'}
        variants={{
          open: { opacity: 1, visibility: 'visible' },
          closed: { opacity: 0, visibility: 'hidden' },
        }}
      >
        {pokemonId > 0 && !isLaodingPokemon && !isLoadingSpecies && (
          <div id="modal" className="relative pt-8 pb-4 px-7">
            <div
              className="absolute left-0 top-0 w-8 h-10 cursor-pointer z-30"
              onClick={() => setPokemonId(0)}
            >
              <ChevronLeft className="w-full h-full" />
            </div>
            <div className="relative z-30 flex flex-col w-full overflow-hidden whitespace-nowrap">
              <p className="text-xs text-white">#{pokemonId.toString().padStart(4, '0')}</p>
              <p className="text-xl font-black text-white relative leading-6 overflow-hidden text-ellipsis">
                {capitalize(name)}
              </p>
              <div className="flex justify-center -mt-2 w-full">
                <Image
                  className="pixelated"
                  src={`${POKEMON_IMAGES.evolution}/${pokemonId.toString().padStart(3, '0')}.png`}
                  alt={name}
                  width="120"
                  height="120"
                  draggable={false}
                />
              </div>
              <p className="text-zinc-700 text-[10px] font-semibold mt-1 whitespace-normal">
                {flavorText}
              </p>
            </div>
            <div
              className={`absolute top-0 left-0 w-full h-full rounded-xl shadow-sm transition-opacity overflow-hidden bg-${firstType}`}
            >
              <div className="relative w-[200%] h-[200%] -left-32 right-32 bg-white top-[116px] rounded-[100%]" />
            </div>
            <Image
              className="absolute top-10 left-8 overflow-hidden opacity-30"
              src={`/assets/icons/type/${firstType}.svg`}
              alt=""
              width={12}
              height={12}
              draggable={false}
            />
            <Image
              className="absolute top-14 left-0.5 overflow-hidden opacity-30"
              src={`/assets/icons/type/${firstType}.svg`}
              alt=""
              width={24}
              height={24}
              draggable={false}
            />
            <Image
              className="absolute top-[60px] left-10 overflow-hidden opacity-30"
              src={`/assets/icons/type/${firstType}.svg`}
              alt=""
              width={18}
              height={18}
              draggable={false}
            />
            <Image
              className="absolute top-20 left-1.5 overflow-hidden opacity-30"
              src={`/assets/icons/type/${firstType}.svg`}
              alt=""
              width={64}
              height={64}
              draggable={false}
            />
            <Pokeball className="absolute top-6 -right-8 overflow-hidden ml-auto text-zinc-50 w-[125px] h-[125px] opacity-30" />
          </div>
        )}
      </motion.div>
    </pokemonModalHtml.In>
  );
};

export default memo(Pokemon);
