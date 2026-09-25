import { create } from "zustand";

export const useFnafStore = create((set) => ({
  isCamerasOpen: false,
  openCameras: () => set({ isCamerasOpen: true }),
  closeCameras: () => set({ isCamerasOpen: false }),
  toggleCameras: () => set((state) => ({ isCamerasOpen: !state.isCamerasOpen })),
}));
