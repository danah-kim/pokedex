import capitalize from 'lodash-es/capitalize';
import Image from 'next/image';
import { memo } from 'react';

interface PokemonAboutProps {
  height: number;
  weight: number;
  category: string;
  firstAbility: string;
}

const PokemonAbout: React.FC<PokemonAboutProps> = ({ height, weight, category, firstAbility }) => {
  return (
    <div className="relative flex flex-col gap-1.5 pt-2.5 px-3 pb-3.5">
      <div className="z-10">
        <div className="flex text-[9px] text-zinc-700">
          <p className="w-14 m-w-[56px]">Height</p>
          <b className="overflow-hidden text-ellipsis">{height / 10}m</b>
        </div>
        <div className="flex text-[9px] text-zinc-700">
          <p className="w-14 m-w-[56px]">Weight</p>
          <b className="overflow-hidden text-ellipsis">{weight / 10}kg</b>
        </div>
        <div className="flex text-[9px] text-zinc-700">
          <p className="w-14 m-w-[56px]">Category</p>
          <b className="overflow-hidden text-ellipsis">{category}</b>
        </div>
        <div className="flex text-[9px] text-zinc-700">
          <p className="w-14 m-w-[56px]">Abilities</p>
          <b className="overflow-hidden text-ellipsis">{capitalize(firstAbility)}</b>
        </div>
      </div>
      <div className="absolute inset-0 overflow-hidden">
        <Image
          className="ml-auto translate-x-4 translate-y-2.5"
          src="/assets/icons/pokeball.svg"
          alt=""
          width={90}
          height={90}
          draggable={false}
        />
      </div>
    </div>
  );
};

export default memo(PokemonAbout);
