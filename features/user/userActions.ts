import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fakeFetch, fakeParties 
} from "../../services/fake";
import ApiService from "../../services/api";
import { MatchStatus } from "../../models/types";

export const fetchUser = createAsyncThunk('user/fetchUser', async() => {
  const userInfo = await ApiService.get('user/info');
  const { matches } = await ApiService.get('user/matches');
  const { parties } = await ApiService.get('user/parties');
  return { ...userInfo.user, matches, parties };
});

export const updateMatch = createAsyncThunk('user/updateMatch', async(updatePayload: { matchId: number, status: MatchStatus }) => {
  const { matches } = await ApiService.put('user/matches', updatePayload);
  return matches;
});

export const deleteMatch = createAsyncThunk('user/deleteMatch', async(deletePayload: { matchId: number }) => {
  const { matches } = await ApiService.delete('user/matches', deletePayload);
  return matches;
});

export const updateParty = createAsyncThunk('user/updateParty', async() => {
  const response = await fakeFetch({ parties: fakeParties }, 2000);
  return response.parties;
});
