import { create } from 'zustand'

type ScoreStore = {
	score: number;
	increaseScore: () => void;
	setScore: (newScore: number) => void;
	removeScore: () => void;
};

const useScoreStore = create<ScoreStore>((set) => ({
	score: 0,
	increaseScore: () => set((state) => ({ score: state.score + 1 })),
	setScore: (newScore: number) => set({ score: newScore }),
	removeScore: () => set({ score: 0 })
}))

export default useScoreStore;
