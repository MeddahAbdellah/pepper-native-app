import { usePepperSelector } from "./store.hooks";
import { IUser, StoreStatus } from "../models/types";

interface IUserStore {
  user: IUser;
  fetchStatus: StoreStatus;
  updateMatchStatus: StoreStatus;
  deleteMatchStatus: StoreStatus;
  updatePartyStatus: StoreStatus;
  error: any;
}

export const usePepperUser = (): IUserStore => usePepperSelector((state) => state.user);
