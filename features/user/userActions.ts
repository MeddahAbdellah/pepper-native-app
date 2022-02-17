import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiService from '../../services/api';
import { MatchStatus } from '../../models/types';
import { UtilService } from '../../services/util';

export const fetchUser = createAsyncThunk('user/fetchUser', async() => {
  const userInfo = await ApiService.get('user/info').catch(async(error) => UtilService.throwError(error));
  const { matches } = await ApiService.get('user/matches').catch(async(error) => UtilService.throwError(error));
  const { parties } = await ApiService.get('user/parties').catch(async(error) => UtilService.throwError(error));
  return { ...userInfo.user, matches, parties };
});

export const addMatch = createAsyncThunk('user/addMatch', async(updatePayload: { matchId: number }) => {
  const { matches } = await ApiService.post('user/matches', updatePayload).catch(async(error) => UtilService.throwError(error));
  return matches;
});

export const updateMatch = createAsyncThunk('user/updateMatch', async(updatePayload: { matchId: number, status: MatchStatus }) => {
  const { matches } = await ApiService.put('user/matches', updatePayload).catch(async(error) => UtilService.throwError(error));
  return matches;
});

export const deleteMatch = createAsyncThunk('user/deleteMatch', async(deletePayload: { matchId: number }) => {
  const { matches } = await ApiService.delete('user/matches', deletePayload).catch(async(error) => UtilService.throwError(error));
  return matches;
});

export const updateParty = createAsyncThunk('user/updateParty', async(updatePayload: { partyId: number }) => {
  const { parties } = await ApiService.post('user/parties', updatePayload).catch(async(error) => UtilService.throwError(error));
  return parties;
});

export const deleteParty = createAsyncThunk('user/deleteParty', async(deletePayload: { partyId: number }) => {
  const { parties } = await ApiService.delete('user/parties', deletePayload).catch(async(error) => UtilService.throwError(error));
  return parties;
});
