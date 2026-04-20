import { create } from 'zustand';
import { useRestaurantStore } from './restaurantStore';

type Phase = 'splash' | 'entering' | 'fetching' | 'exiting' | 'hidden';

type LoadingStore = {
  animationPhase: Phase;
  startEntry: () => void;
  entryComplete: () => Promise<void>;
  fetchComplete: () => void;
  exitComplete: () => void;
};

export const useLoadingStore = create<LoadingStore>((set, get) => ({
  animationPhase: 'splash',
  startEntry: () => get().animationPhase === 'splash' && set({ animationPhase: 'entering' }),
  entryComplete: async () => {
    if (get().animationPhase !== 'entering') return;
    set({ animationPhase: 'fetching' });
    await useRestaurantStore.getState().fetchRestaurants();
    get().fetchComplete();
  },
  fetchComplete: () => set({ animationPhase: 'exiting' }),
  exitComplete: () => set({ animationPhase: 'hidden' }),
}));
