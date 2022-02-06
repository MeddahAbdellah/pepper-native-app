import { usePepperSelector } from "./store.hooks";
import { IUserStore } from "../models/types";

export const usePepperUser = (): IUserStore => usePepperSelector((state) => state.user);
