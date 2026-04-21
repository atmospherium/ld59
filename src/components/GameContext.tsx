import { create } from "zustand";
import type { SliderState } from "./Slider";

export type GameState = {
  collectedItems: Array<string>;
  addCollectedItem: (item: string) => void;
  checkpoints: Array<string>;
  addCheckpoint: (item: string) => void;
  slider1: SliderState;
  slider2: SliderState;
  slider3: SliderState;
};

export const useGameContext = create<GameState>((set, get) => ({
  collectedItems: [],
  addCollectedItem: (item: string) =>
    set({ collectedItems: [...get().collectedItems, item] }),
  checkpoints: [],
  addCheckpoint: (item: string) =>
    set({ checkpoints: [...get().checkpoints, item] }),
  slider1: {
    val: 1,
    targets: [20, 74],
    setVal: (val) => set({ slider1: { ...get().slider1, val: val } }),
    proximities: () =>
      Math.min(
        ...get().slider1.targets.map((target) =>
          Math.abs(target - get().slider1.val),
        ),
      ),
    proximity: (index) =>
      Math.abs(get().slider1.targets[index] - get().slider1.val),
  },
  slider2: {
    val: 1,
    targets: [30, 95],
    setVal: (val) => set({ slider2: { ...get().slider2, val: val } }),
    proximities: () =>
      Math.min(
        ...get().slider2.targets.map((target) =>
          Math.abs(target - get().slider2.val),
        ),
      ),
    proximity: (index) =>
      Math.abs(get().slider2.targets[index] - get().slider2.val),
  },
  slider3: {
    val: 1,
    targets: [30, 95],
    setVal: (val) => set({ slider3: { ...get().slider3, val: val } }),
    proximities: () =>
      Math.min(
        ...get().slider3.targets.map((target) =>
          Math.abs(target - get().slider3.val),
        ),
      ),
    proximity: (index) =>
      Math.abs(get().slider3.targets[index] - get().slider3.val),
  },
}));
