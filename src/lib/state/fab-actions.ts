import { observable } from '@legendapp/state';

// Create an observable for FAB state
export const fabState$ = observable({
  isOpen: false,
});

// Actions for FAB state
export const toggleFab = () => {
  fabState$.isOpen.set((prev) => !prev);
};

export const openFab = () => {
  fabState$.isOpen.set(true);
};

export const closeFab = () => {
  fabState$.isOpen.set(false);
};
