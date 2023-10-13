import { create } from 'zustand';

import { SPACE_IMAGE } from '@/constants/theme';

export type SpaceTheme = (typeof SPACE_IMAGE)[keyof typeof SPACE_IMAGE];

const getRandomIndex = (n: number) => Math.floor(Math.random() * n);

export interface ThemeState {
  spaceTheme: SpaceTheme;
  hovered: boolean;
  changeSpaceTheme: (newTheme?: SpaceTheme) => void;
  setHovered: (state?: boolean) => void;
}

const useThemeStore = create<ThemeState>((set) => ({
  spaceTheme: SPACE_IMAGE.glacier,
  hovered: false,
  changeSpaceTheme: (newTheme) =>
    set((prev) => {
      while (typeof newTheme === 'undefined' || newTheme === prev.spaceTheme) {
        newTheme = Object.values(SPACE_IMAGE)[getRandomIndex(3)];
      }

      return {
        spaceTheme: newTheme,
      };
    }),
  setHovered: (state) => set((prev) => ({ hovered: state || !prev.hovered })),
}));

export default useThemeStore;
