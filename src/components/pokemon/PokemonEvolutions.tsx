import classNames from 'classNames';
import capitalize from 'lodash-es/capitalize';
import Image from 'next/image';
import { memo } from 'react';

import { POKEMON_IMAGES } from '@/constants/config';
import type { ChainLink } from '@/typings/pokemon-evolution';
import { getPokemonIdFromUrl } from '@/utils/common';

interface PokemonEvolutionsProps {
  name: string;
  evolutionChain: ChainLink | undefined;
  onClickPokemon: (id: number) => void;
}

const PokemonEvolutions: React.FC<PokemonEvolutionsProps> = ({
  name,
  evolutionChain,
  onClickPokemon,
}) => {
  const firstEvolution = evolutionChain?.species;
  const lastEvolution = evolutionChain?.evolves_to[0]?.evolves_to[0]?.species;
  const secondEvolution = evolutionChain?.evolves_to[0]?.species;
  const noEvolution = !firstEvolution && !lastEvolution;

  return (
    <>
      {noEvolution && (
        <div className="relative pt-2.5 px-3 z-10 font-semibold text-[9px] text-zinc-700">
          This Pokémon does not evolve.
        </div>
      )}
      <div
        className={classNames(
          'relative px-3 pb-3.5 h-full z-10 flex gap-1.5',
          !noEvolution && 'pt-2.5',
        )}
      >
        {!!firstEvolution && (
          <div
            className="h-full w-1/3 flex flex-col items-center cursor-pointer"
            onClick={() => onClickPokemon(getPokemonIdFromUrl(firstEvolution.url))}
          >
            <Image
              className="pixelated"
              src={`${POKEMON_IMAGES.evolution}/${getPokemonIdFromUrl(firstEvolution.url)
                .toString()
                .padStart(3, '0')}.png`}
              alt={firstEvolution.name}
              width="96"
              height="96"
              draggable={false}
            />
            <p
              className={classNames(
                'text-[9px] text-zinc-700 text-center',
                firstEvolution.name === name && 'font-semibold',
              )}
            >
              {capitalize(firstEvolution.name)}
            </p>
          </div>
        )}
        {!!secondEvolution && (
          <div
            className="w-1/3 flex flex-col items-center cursor-pointer"
            onClick={() => onClickPokemon(getPokemonIdFromUrl(secondEvolution.url))}
          >
            <Image
              className="pixelated"
              src={`${POKEMON_IMAGES.evolution}/${getPokemonIdFromUrl(secondEvolution.url)
                .toString()
                .padStart(3, '0')}.png`}
              alt={secondEvolution.name}
              width="96"
              height="96"
              draggable={false}
            />
            <p
              className={classNames(
                'text-[9px] text-zinc-700 text-center',
                secondEvolution.name === name && 'font-semibold',
              )}
            >
              {capitalize(secondEvolution.name)}
            </p>
          </div>
        )}
        {!!lastEvolution && (
          <div
            className={classNames(
              'w-1/3 flex flex-col items-center',
              !noEvolution && 'cursor-pointer',
            )}
            onClick={() =>
              noEvolution ? undefined : onClickPokemon(getPokemonIdFromUrl(lastEvolution.url))
            }
          >
            <Image
              className="pixelated"
              src={`${POKEMON_IMAGES.evolution}/${getPokemonIdFromUrl(lastEvolution.url)
                .toString()
                .padStart(3, '0')}.png`}
              alt={lastEvolution.name}
              width="96"
              height="96"
              draggable={false}
            />
            <p
              className={classNames(
                'text-[9px] text-zinc-700 text-center',
                lastEvolution.name === name && 'font-semibold',
              )}
            >
              {capitalize(lastEvolution.name)}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default memo(PokemonEvolutions);
