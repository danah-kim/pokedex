import dynamic from 'next/dynamic';
import Image from 'next/image';

const Device = dynamic(() => import('@/components/canvas/Device'), { ssr: false });
const View = dynamic(() => import('@/components/canvas/View'), {
  ssr: false,
  loading: () => (
    <Image
      src="/pokeball.png"
      alt="Pokeball"
      className="animate-rotate-poke-ball"
      width={48}
      height={48}
      priority
    />
  ),
});

export default function Home() {
  return (
    <main className="relative w-screen h-screen flex items-center justify-center">
      <View camera={{ position: [-5, 0, -15], fov: 45 }} orbitOptions>
        <Device />
      </View>
    </main>
  );
}
