import { create } from 'zustand';

export interface PokemonState {
  pokemonsParams: {
    offset: number;
    limit: number;
  };
  pokemonName: string;
  selectPokemon: (pokemonName: string) => void;
}

const usePokemonStore = create<PokemonState>((set) => ({
  pokemonsParams: {
    offset: 0,
    limit: 20,
  },
  pokemonName: '',
  selectPokemon: (pokemonName) => set(() => ({ pokemonName })),
}));

export default usePokemonStore;
