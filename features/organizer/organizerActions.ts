import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiService from '../../services/api';
import {
  IPartyEvent, IOrganizer, OrganizerStatus, IParty,
} from '../../models/types';
import { UtilService } from '../../services/util';


export const emptyOrganizer: IOrganizer = {
  userName: '',
  title: '',
  location: '',
  phoneNumber: '',
  address: '',
  description: '',
  imgs: [],
  foods: [],
  drinks: [],
  status: OrganizerStatus.Pending,
  parties: [],
  id: 0
};

export const resetOrganizer = createAsyncThunk('organizer/resetOrganizer', async() => emptyOrganizer);

export const fetchOrganizer = createAsyncThunk('organizer/fetchOrganizer', async() => {
  const organizerInfo = await ApiService.get('organizer').catch(async(error) => UtilService.throwError(error));
  const { parties } = await ApiService.get('organizer/party').catch(async(error) => UtilService.throwError(error));
  return { ...organizerInfo.organizer, parties } as IOrganizer;
});

export const updateOrganizer = createAsyncThunk('organizer/updateOrganizer', async(updatePayload: Partial<IOrganizer>) => {
  const organizerInfo = await ApiService.put('organizer', updatePayload).catch(async(error) => UtilService.throwError(error));
  const { parties } = await ApiService.get('organizer/party').catch(async(error) => UtilService.throwError(error));
  return { ...organizerInfo.organizer, parties } as IOrganizer;
});

export const createParty = createAsyncThunk('organizer/createParty', async(payload: IPartyEvent) => {
  const { parties } = await ApiService.post('organizer/party', payload).catch(async(error) => UtilService.throwError(error));
  return parties as IParty[];
});
