import { create } from 'zustand';

type LayoutState = {
    skipGlobalLayout: boolean;
    setSkipGlobalLayout: (skip: boolean) => void;
};

export const useLayoutStore = create<LayoutState>((set) => ({
    skipGlobalLayout: false,
    setSkipGlobalLayout: (skip) => set({ skipGlobalLayout: skip }),
}));
