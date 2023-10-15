'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';

import PokemonList from '@/components/Pokemons';
import useThemeStore from '@/stores/themeStore';

const Device = dynamic(() => import('@/components/canvas/Device'), { ssr: false });
const View = dynamic(() => import('@/components/canvas/View'), {
  ssr: false,
  loading: () => (
    <Image
      src="/assets/images/pokeball.png"
      alt="Pokeball"
      className="animate-rotate-poke-ball"
      width={240}
      height={240}
      priority
    />
  ),
});

export default function Pokemons() {
  const { spaceTheme, hovered } = useThemeStore();

  return (
    <main className={`relative w-screen h-screen flex items-center justify-center`}>
      <Image
        src={`/assets/images/${spaceTheme}.jpg`}
        alt="background image"
        fill
        className="opacity-90"
      />
      <View
        className={hovered ? 'cursor-pointer' : 'cursor-default'}
        camera={{ position: [-5, 0, -15], fov: 45 }}
        orbitOptions
      >
        <Device />
      </View>
      <PokemonList />
    </main>
  );
}
