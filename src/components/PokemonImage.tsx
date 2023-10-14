import Image, { type ImageProps } from 'next/image';
import { memo } from 'react';

import { POKEMON_IMAGES } from '@/constants/config';

interface PokemonImageProps extends Omit<ImageProps, 'src'> {
  pokemonId: number;
  format?: 'png' | 'gif';
}

const PokemonImage: React.FC<PokemonImageProps> = ({ pokemonId, format = 'png', ...pros }) => {
  return <Image {...pros} src={`${POKEMON_IMAGES[format]}/${pokemonId}.${format}`} />;
};

export default memo(PokemonImage);
