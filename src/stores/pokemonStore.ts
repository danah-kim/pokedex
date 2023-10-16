import { create } from 'zustand';

export interface PokemonState {
  pokemonsParams: {
    offset: number;
    limit: number;
  };
  pokemonId: number;
  setPokemonId: (pokemonId: number) => void;
}

const usePokemonStore = create<PokemonState>((set) => ({
  pokemonsParams: {
    offset: 0,
    limit: 20,
  },
  pokemonId: 0,
  setPokemonId: (pokemonId) => set(() => ({ pokemonId })),
}));

export default usePokemonStore;
