import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiService from '../../services/api';
import { IOrganizer } from '../../models/types';
import { UtilService } from '../../services/util';
import { Moment } from 'moment';

export const emptyOrganizer: IOrganizer = {
  id: 0,
  title: '',
  userName: '',
  password: '',
  location: '',
  phoneNumber: '',
  description: '',
  foods: [],
  drinks: [],
  imgs: [],
  parties: [],
};

export const resetOrganizer = createAsyncThunk('organizer/resetOrganizer', async() => emptyOrganizer);

export const fetchOrganizer = createAsyncThunk('organizer/fetchOrganizer', async() => {
  const organizerInfo = await ApiService.get('organizer').catch(async(error) => UtilService.throwError(error));
  const { parties } = await ApiService.get('organizer/party').catch(async(error) => UtilService.throwError(error));
  return { ...organizerInfo.organizer, parties };
});

export const updateOrganizer = createAsyncThunk('organizer/updateOrganizer', async(updatePayload: Partial<IOrganizer>) => {
  const organizerInfo = await ApiService.put('organizer', updatePayload).catch(async(error) => UtilService.throwError(error));
  const { parties } = await ApiService.get('organizer/party').catch(async(error) => UtilService.throwError(error));
  return { ...organizerInfo.organizer, parties };
});

export const updateParty = createAsyncThunk('organizer/updateParty', async(updatePayload: { partyId: number }) => {
  const { parties } = await ApiService.put('organizer/party', updatePayload).catch(async(error) => UtilService.throwError(error));
  return parties;
});

export const addParty = createAsyncThunk('organizer/addParty', async(addPayload: {
  theme: string,
  date: Moment,
  price: number,
  people: number,
  minAge: number,
  maxAge: number,
 }) => {
  const { parties } = await ApiService.post('organizer/party', addPayload).catch(async(error) => UtilService.throwError(error));
  return parties;
});

export const deleteParty = createAsyncThunk('organizer/deleteParty', async(deletePayload: { partyId: number }) => {
  const { parties } = await ApiService.delete('organizer/party', deletePayload).catch(async(error) => UtilService.throwError(error));
  return parties;
});
