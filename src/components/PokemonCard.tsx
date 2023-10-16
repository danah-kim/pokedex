import capitalize from 'lodash-es/capitalize';
import Image from 'next/image';
import { memo, useMemo } from 'react';

import usePokemonStore from '@/stores/pokemonStore';
import type { Type } from '@/typings/pokemon-type';

import PokemonImage from './PokemonImage';

interface PokemonCardProps {
  id: number;
  name: string;
  types: Type[];
}

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, types }) => {
  const { setPokemonId } = usePokemonStore();

  const [{ name: firstType }, { name: secondType = '' } = {}] = useMemo(
    () =>
      types.sort(
        (a, b) =>
          a.pokemon.find(({ pokemon }) => pokemon.name === name)!.slot -
          b.pokemon.find(({ pokemon }) => pokemon.name === name)!.slot,
      ),
    [name, types],
  );

  return (
    <div
      className="relative flex flex-row h-[100px] cursor-pointer group"
      onClick={() => setPokemonId(id)}
    >
      <div className="flex-1 z-10 pl-4 py-2 overflow-hidden">
        <h1
          className={`text-xl text-pokemon-${firstType}-main font-semibold overflow-hidden whitespace-nowrap text-ellipsis`}
        >
          {capitalize(name)}
        </h1>
        <div className="flex flex-col justify-between">
          <div className="flex-1 flex gap-1.5 flex-wrap">
            <div className="flex gap-0.5 items-center">
              <div className={`bg-pokemon-${firstType}-main rounded-full p-0.5`}>
                <Image
                  src={`/assets/icons/type/${firstType}.svg`}
                  alt=""
                  width={8}
                  height={8}
                  draggable={false}
                />
              </div>
              <p className="text-xs text-white">{capitalize(firstType)}</p>
            </div>
            {secondType.length > 0 && (
              <div className="flex gap-0.5 items-center">
                <div className={`bg-pokemon-${secondType}-main rounded-full p-0.5`}>
                  <Image
                    src={`/assets/icons/type/${secondType}.svg`}
                    alt=""
                    width={8}
                    height={8}
                    draggable={false}
                  />
                </div>
                <p className="text-xs text-white">{capitalize(secondType)}</p>
              </div>
            )}
          </div>
          <p className="mt-4 text-white text-sm">{id.toString().padStart(4, '0')}</p>
        </div>
      </div>
      <div className="relative overflow-hidden z-10">
        <Image
          className="translate-x-5 translate-y-5"
          src={`/assets/icons/bg/${firstType}.svg`}
          alt=""
          width={90}
          height={90}
          draggable={false}
          priority
        />
        <PokemonImage
          className="p-4"
          pokemonId={id}
          format="gif"
          alt={name}
          width="96"
          height="96"
          draggable={false}
        />
      </div>
      <div
        className={`absolute top-0 left-0 w-full h-full rounded-2xl shadow-sm bg-pokemon-${firstType}-main opacity-30 transition-opacity group-hover:opacity-40`}
      />
    </div>
  );
};

export default memo(PokemonCard);
