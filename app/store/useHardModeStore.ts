import { create } from 'zustand'

type HardModeStore = {
    hardmode: boolean;
    setHardmode: (hardmode: boolean) => void;
};

const useHardModeStore = create<HardModeStore>((set) => ({
    hardmode: false,
    setHardmode: (hardmode) => set({ hardmode }),
}))

export default useHardModeStore;