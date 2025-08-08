import { create } from 'zustand'

type HighScoreStore = {
	highscore: number;
	increaseHighscore: () => void;
	setHighscore: (newHighscore: number) => void;
	removeHighscore: () => void;
};

const useHighScoreStore = create<HighScoreStore>((set) => ({
	highscore: 0,
	increaseHighscore: () => set((state) => ({ highscore: state.highscore + 1 })),
	setHighscore: (newHighscore: number) => set({ highscore: newHighscore }),
	removeHighscore: () => set({ highscore: 0 })
}))

export default useHighScoreStore;