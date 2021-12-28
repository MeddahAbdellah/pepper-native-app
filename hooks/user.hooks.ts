import { usePepperSelector } from "./store.hooks";
export const usePepperUser = () => usePepperSelector((state) => state.user);
