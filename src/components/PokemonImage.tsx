import Image, { type ImageProps } from 'next/image';
import { memo, useState } from 'react';

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

  return (
    <>
      {!loaded && (
        <div className={`${className} animate-spin text-gray-300`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.0"
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)"
              fill="currentColor"
              stroke="none"
            >
              <path d="M385 897 c-154 -51 -271 -184 -291 -330 l-7 -47 132 0 131 0 11 28 c51 134 237 134 288 0 l11 -28 131 0 132 0 -7 47 c-17 124 -113 249 -234 306 -58 27 -79 32 -162 34 -59 2 -110 -2 -135 -10z" />
              <path d="M484 582 c-35 -5 -68 -48 -68 -88 0 -78 95 -117 151 -61 64 64 9 163 -83 149z" />
              <path d="M94 423 c17 -123 113 -249 234 -306 63 -30 74 -32 177 -32 103 0 114 2 177 32 121 57 217 183 234 306 l7 47 -132 0 -131 0 -14 -33 c-27 -67 -105 -108 -175 -92 -41 9 -90 51 -107 92 l-14 33 -131 0 -132 0 7 -47z" />
            </g>
          </svg>
        </div>
      )}
      <Image
        {...props}
        onLoad={() => setLoaded(true)}
        className={className}
        src={`${POKEMON_IMAGES[format]}/${pokemonId}.${format}`}
      />
    </>
  );
};

export default memo(PokemonImage);
