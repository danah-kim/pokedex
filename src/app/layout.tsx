import './globals.css';

import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';

import ReactQueryProvider from '@/providers/ReactQueryProvider';

const notoSans = Noto_Sans({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Pokédex',
  description: 'Pokédex',
  viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0',
  keywords: 'pokedex, pokeAPI, pokemon, three.js, three-fiber, project',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={notoSans.className}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
