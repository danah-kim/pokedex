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
    <div className="relative pt-2.5 px-3 pb-3.5 h-full z-10 flex flex-col gap-1.5">
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
  );
};

export default memo(PokemonAbout);
