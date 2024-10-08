'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';

import useThemeStore from '@/stores/themeStore';

const PokemonList = dynamic(() => import('./PokemonList'));
const PokemonInfo = dynamic(() => import('./pokemonInfo'));
const PokemonItem = dynamic(() => import('./PokemonItem'));

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
      priority
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
      <PokemonItem />
    </main>
  );
}
