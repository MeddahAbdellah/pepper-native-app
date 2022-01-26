import { usePepperSelector } from "./store.hooks";
import { IParty } from "../models/types";

interface IPartyStore {
  parties: IParty[];
  status: string;
  error: any;
}

export const usePepperParties = (): IPartyStore => usePepperSelector((state) => state.parties);
