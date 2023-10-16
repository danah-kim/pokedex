'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';

import useThemeStore from '@/stores/themeStore';

const PokemonList = dynamic(() => import('@/components/Pokemons'));
const PokemonInfo = dynamic(() => import('@/components/PokemonInfo'));
const Pokemon = dynamic(() => import('@/components/Pokemon'));

const Device = dynamic(() => import('@/components/canvas/Device'), { ssr: false });
const View = dynamic(() => import('@/components/canvas/View'), {
  ssr: false,
  loading: () => (
    <Image
      className="animate-rotate-poke-ball"
      src="/assets/images/pokeball.png"
      alt="Pokeball"
      width={240}
      height={240}
      draggable={false}
    />
  ),
});

export default function Pokemons() {
  const { spaceTheme, hovered } = useThemeStore();

  return (
    <main className="relative w-screen h-screen flex items-center justify-center">
      <Image
        className="opacity-90"
        src={`/assets/images/${spaceTheme}.jpg`}
        alt="background image"
        fill
        draggable={false}
      />
      <View
        className={hovered ? 'cursor-pointer' : 'cursor-default'}
        camera={{ position: [-5, 0, -15], fov: 45 }}
        orbitOptions
      >
        <Device />
      </View>
      <PokemonList />
      <PokemonInfo />
      <Pokemon />
    </main>
  );
}
