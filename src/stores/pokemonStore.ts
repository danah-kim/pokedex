import { create } from 'zustand';

export interface PokemonState {
  offset: number;
  limit: number;
}

const usePokemonStore = create<PokemonState>((set) => ({
  offset: 0,
  limit: 20,
}));

export default usePokemonStore;
