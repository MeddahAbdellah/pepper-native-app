import { usePepperSelector } from "./store.hooks";
export const usePepperParties = () => usePepperSelector((state) => state.parties);
