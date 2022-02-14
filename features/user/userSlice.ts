import { createSlice } from '@reduxjs/toolkit';
import {
  IUser, Gender, StoreStatus, IUserStore,
} from '../../models/types';
import {
  fetchUser, updateMatch, updateParty, deleteMatch, deleteParty, addMatch,
} from './userActions';

const emptyUser: IUser = {
  id: 0,
  name: '',
  gender: Gender.MAN,
  phoneNumber: '',
  address: '',
  description: '',
  job: '',
  imgs: [],
  interests: [],
  matches: [],
  parties: [],
};

const initialState: IUserStore = {
  user: emptyUser,
  fetchStatus: StoreStatus.Idle,
  addMatchStatus: StoreStatus.Idle,
  updateMatchStatus: StoreStatus.Idle,
  deleteMatchStatus: StoreStatus.Idle,
  updatePartyStatus: StoreStatus.Idle,
  deletePartyStatus: StoreStatus.Idle,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.fetchStatus = StoreStatus.Pending;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.fetchStatus = StoreStatus.Fulfilled;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.fetchStatus = StoreStatus.Rejected;
        state.error = action.error.message;
      })
      .addCase(addMatch.pending, (state) => {
        state.addMatchStatus = StoreStatus.Pending;
      })
      .addCase(addMatch.fulfilled, (state, action) => {
        state.addMatchStatus = StoreStatus.Fulfilled;
        state.user.matches = action.payload;
      })
      .addCase(addMatch.rejected, (state, action) => {
        state.addMatchStatus = StoreStatus.Rejected;
        state.error = action.error.message;
      })
      .addCase(updateMatch.pending, (state) => {
        state.updateMatchStatus = StoreStatus.Pending;
      })
      .addCase(updateMatch.fulfilled, (state, action) => {
        state.updateMatchStatus = StoreStatus.Fulfilled;
        state.user.matches = action.payload;
      })
      .addCase(updateMatch.rejected, (state, action) => {
        state.updateMatchStatus = StoreStatus.Rejected;
        state.error = action.error.message;
      })
      .addCase(deleteMatch.pending, (state) => {
        state.deleteMatchStatus = StoreStatus.Pending;
      })
      .addCase(deleteMatch.fulfilled, (state, action) => {
        state.deleteMatchStatus = StoreStatus.Fulfilled;
        state.user.matches = action.payload;
      })
      .addCase(deleteMatch.rejected, (state, action) => {
        state.deleteMatchStatus = StoreStatus.Rejected;
        state.error = action.error.message;
      })
      .addCase(updateParty.pending, (state) => {
        state.updatePartyStatus = StoreStatus.Pending;
      })
      .addCase(updateParty.fulfilled, (state, action) => {
        state.updatePartyStatus = StoreStatus.Fulfilled;
        state.user.parties = action.payload;
      })
      .addCase(updateParty.rejected, (state, action) => {
        state.updatePartyStatus = StoreStatus.Rejected;
        state.error = action.error.message;
      })
      .addCase(deleteParty.pending, (state) => {
        state.deletePartyStatus = StoreStatus.Pending;
      })
      .addCase(deleteParty.fulfilled, (state, action) => {
        state.deletePartyStatus = StoreStatus.Fulfilled;
        state.user.parties = action.payload;
      })
      .addCase(deleteParty.rejected, (state, action) => {
        state.deletePartyStatus = StoreStatus.Rejected;
        state.error = action.error.message;
      });
  }
});

export default userSlice.reducer;
