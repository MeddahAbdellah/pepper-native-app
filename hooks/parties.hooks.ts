import { usePepperSelector } from './store.hooks';
import { IParty } from '../models/types';

interface IPartyStore {
  parties: IParty[];
  status: string;
  // TODO: Library does not provide a type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}

export const usePepperParties = (): IPartyStore => usePepperSelector((state) => state.parties);
