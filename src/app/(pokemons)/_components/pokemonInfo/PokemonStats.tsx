import { twMerge } from 'tailwind-merge';

import { STAT } from '@/constants/pokemon';
import type { PokemonStat } from '@/typings/pokemon';

interface PokemonStatsProps {
  stats: PokemonStat[];
}

const PokemonStats: React.FC<PokemonStatsProps> = ({ stats }) => {
  return (
    <div className="relative pt-2.5 px-3 h-full z-10 flex flex-col gap-1.5">
      {stats.map(({ base_stat, stat: { name } }, index) => (
        <div
          key={`stat-${name}`}
          className={twMerge(
            'flex text-[9px] text-zinc-700 items-center',
            index === stats.length - 1 && 'pb-3',
          )}
        >
          <p className="w-28 m-w-[112px]">{STAT[name as keyof typeof STAT].name || name}</p>
          <div className="relative flex gap-2 w-full items-center">
            <b>{base_stat}</b>
            <span className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-zinc-200">
              <span
                className="absolute h-full bg-primary left-0 rounded-full"
                style={{
                  right: `${100 - base_stat}%`,
                  backgroundColor: STAT[name as keyof typeof STAT].color,
                }}
              />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PokemonStats;
