import Image, { type ImageProps } from 'next/image';
import Pokeball from 'public/assets/icons/bg/pokeball.svg';
import { memo, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { POKEMON_IMAGES } from '@/constants/config';

interface PokemonImageProps extends Omit<ImageProps, 'src'> {
  pokemonId: number;
  format?: 'png' | 'gif';
}

const PokemonImage: React.FC<PokemonImageProps> = ({
  pokemonId,
  format = 'png',
  className,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleOnLoad = () => {
    setLoaded(true);

    if (error) setError(false);
  };

  return (
    <>
      {!loaded && (
        <div className={`${className} animate-spin text-gray-300 w-full h-full`}>
          <Pokeball className="w-full h-full" />
        </div>
      )}
      <Image
        {...props}
        onLoad={handleOnLoad}
        onError={() => setError(true)}
        className={twMerge('pixelated', className, (error || pokemonId >= 650) && '!p-0')}
        src={
          error || pokemonId >= 650
            ? `${POKEMON_IMAGES.png}/${pokemonId}.png`
            : `${POKEMON_IMAGES[format]}/${pokemonId}.${format}`
        }
      />
    </>
  );
};

export default memo(PokemonImage);
