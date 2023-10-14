import capitalize from 'lodash-es/capitalize';
import Image from 'next/image';
import { useMemo } from 'react';

import type { Type } from '@/typings/pokemon-type';

import PokemonImage from './PokemonImage';

interface PokemonCardProps {
  id: number;
  name: string;
  types: Type[];
}

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, types }) => {
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
    <ul className={`relative flex flex-row h-[100px]`}>
      <div className="flex-1 z-10 pl-4 py-2.5 overflow-hidden">
        <h1
          className={`text-xl text-pokemon-${firstType}-main font-semibold overflow-hidden whitespace-nowrap text-ellipsis`}
        >
          {capitalize(name)}
        </h1>
        <div className="flex gap-1.5 flex-wrap mt-0.5">
          <div className="flex gap-0.5 items-center">
            <div className={`bg-pokemon-${firstType}-main rounded-full p-0.5`}>
              <Image src={`/assets/icons/type/${firstType}.svg`} alt="" width={8} height={8} />
            </div>
            <p className="text-xs text-white">{capitalize(firstType)}</p>
          </div>
          {secondType.length > 0 && (
            <div className="flex gap-0.5 items-center">
              <div className={`bg-pokemon-${secondType}-main rounded-full p-0.5`}>
                <Image src={`/assets/icons/type/${secondType}.svg`} alt="" width={8} height={8} />
              </div>
              <p className="text-xs text-white">{capitalize(secondType)}</p>
            </div>
          )}
        </div>
      </div>
      <div className="relative overflow-hidden z-10">
        <Image
          className="translate-x-5 translate-y-5"
          src={`/assets/icons/bg/${firstType}.svg`}
          alt=""
          width={90}
          height={90}
        />
        <PokemonImage
          className="absolute inset-0 m-auto"
          pokemonId={id}
          format="gif"
          alt={name}
          width={64}
          height={64}
        />
      </div>
      <div
        className={`absolute top-0 left-0 w-full h-full rounded-2xl shadow-sm bg-pokemon-${firstType}-main opacity-30`}
      />
    </ul>
  );
};

export default PokemonCard;
