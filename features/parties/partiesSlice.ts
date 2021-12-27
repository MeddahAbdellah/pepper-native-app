import { createSlice } from '@reduxjs/toolkit';
import { IParty, StoreStatus } from '../../models/types';
import { fetchParties } from './partiesActions';

const emptyParties: IParty[] = [];

const initialState: { parties: IParty[], status: string, error: any } = {
  parties: emptyParties,
  status: 'idle',
  error: null,
};
const pendingAction = (state: any) => {
  state.status = StoreStatus.Pending;
};

const rejectedAction = (state: any, action: any) => {
  state.status = StoreStatus.Rejected;
  state.error = action.error.message;
};

export const partiesSlice = createSlice({
  name: 'parties' ,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchParties.pending, pendingAction)
      .addCase(fetchParties.fulfilled, (state, action) => {
        state.status = StoreStatus.Fulfilled;
        state.parties = action.payload;
      })
      .addCase(fetchParties.rejected, rejectedAction);
  }
})

export default partiesSlice.reducer;
