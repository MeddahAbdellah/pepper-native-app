import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fakeFetch, fakeMatches, fakeParties, fakeUser 
} from "../../services/fake";

export const fetchUser = createAsyncThunk('user/fetchUser', async() => {
  const response = await fakeFetch({ user: fakeUser }, 2000);
  return response.user;
});

export const updateMatch = createAsyncThunk('user/updateMatch', async() => {
  const response = await fakeFetch({ matches: fakeMatches }, 2000);
  return response.matches;
});

export const updateParty = createAsyncThunk('user/updateParty', async() => {
  const response = await fakeFetch({ parties: fakeParties }, 2000);
  return response.parties;
});
