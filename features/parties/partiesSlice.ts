// TODO: Library does not provide a type
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';
import { IParty, StoreStatus } from '../../models/types';
import { fetchParties } from './partiesActions';

const emptyParties: IParty[] = [];

const initialState: { parties: IParty[], status: string, error: any } = {
  parties: emptyParties,
  status: 'idle',
  error: null,
};
const pendingReducer = (state: any): void => {
  state.status = StoreStatus.Pending;
};

const rejectedReducer = (state: any, action: any): void => {
  state.status = StoreStatus.Rejected;
  state.error = action.error.message;
};

export const partiesSlice = createSlice({
  name: 'parties',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchParties.pending, pendingReducer)
      .addCase(fetchParties.fulfilled, (state, action) => {
        state.status = StoreStatus.Fulfilled;
        state.parties = action.payload;
      })
      .addCase(fetchParties.rejected, rejectedReducer);
  }
});

export default partiesSlice.reducer;
