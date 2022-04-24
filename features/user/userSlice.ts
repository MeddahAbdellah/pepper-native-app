import { createSlice } from '@reduxjs/toolkit';
import {
  StoreStatus, IUserStore,
} from '../../models/types';
import {
  fetchUser, updateMatch, updateParty, deleteMatch, deleteParty, addMatch, emptyUser, resetUser, updateUser, attendParty,
} from './userActions';

const initialState: IUserStore = {
  user: emptyUser,
  fetchStatus: StoreStatus.Idle,
  updateStatus: StoreStatus.Idle,
  addMatchStatus: StoreStatus.Idle,
  updateMatchStatus: StoreStatus.Idle,
  deleteMatchStatus: StoreStatus.Idle,
  updatePartyStatus: StoreStatus.Idle,
  attendPartyStatus: StoreStatus.Idle,
  deletePartyStatus: StoreStatus.Idle,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // resetUser cannot fail as it is just a simple assignation
      .addCase(resetUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
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
      .addCase(updateUser.pending, (state) => {
        state.updateStatus = StoreStatus.Pending;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateStatus = StoreStatus.Fulfilled;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateStatus = StoreStatus.Rejected;
        state.error = action.error.message;
      })
      .addCase(addMatch.pending, (state) => {
        state.addMatchStatus = StoreStatus.Pending;
      })
      .addCase(addMatch.fulfilled, (state, action) => {
        state.addMatchStatus = StoreStatus.Fulfilled;
        const { parties, matches } = action.payload;
        state.user = { ...state.user, matches, parties };
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
        state.user = { ...state.user, matches: action.payload };
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
        state.user = { ...state.user, matches: action.payload };
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
        state.user = { ...state.user, parties: action.payload };
      })
      .addCase(updateParty.rejected, (state, action) => {
        state.updatePartyStatus = StoreStatus.Rejected;
        state.error = action.error.message;
      })
      .addCase(attendParty.pending, (state) => {
        state.attendPartyStatus = StoreStatus.Pending;
      })
      .addCase(attendParty.fulfilled, (state, action) => {
        state.attendPartyStatus = StoreStatus.Fulfilled;
        state.user = { ...state.user, parties: action.payload };
      })
      .addCase(attendParty.rejected, (state, action) => {
        state.attendPartyStatus = StoreStatus.Rejected;
        state.error = action.error.message;
      })
      .addCase(deleteParty.pending, (state) => {
        state.deletePartyStatus = StoreStatus.Pending;
      })
      .addCase(deleteParty.fulfilled, (state, action) => {
        state.deletePartyStatus = StoreStatus.Fulfilled;
        state.user = { ...state.user, parties: action.payload };
      })
      .addCase(deleteParty.rejected, (state, action) => {
        state.deletePartyStatus = StoreStatus.Rejected;
        state.error = action.error.message;
      });
  }
});

export default userSlice.reducer;
