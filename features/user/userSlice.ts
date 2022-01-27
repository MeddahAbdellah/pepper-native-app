import { createSlice } from '@reduxjs/toolkit';
import { IUser, Gender, StoreStatus } from '../../models/types';
import { fetchUser, updateMatch, updateParty } from './userActions';

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

const initialState: { user: IUser, fetchStatus: StoreStatus,  updateMatchStatus: StoreStatus, updatePartyStatus: StoreStatus, error: any } = {
  user: emptyUser,
  fetchStatus: StoreStatus.Idle,
  updateMatchStatus: StoreStatus.Idle,
  updatePartyStatus: StoreStatus.Idle,
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
      });
  }
});

export default userSlice.reducer;
