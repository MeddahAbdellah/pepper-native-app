import { usePepperSelector } from './store.hooks';
import { IOrganizerStore } from '../models/types';

export const usePepperOrganizer = (): IOrganizerStore => usePepperSelector((state) => state.organizer);
