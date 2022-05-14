import { createSlice } from '@reduxjs/toolkit';
import {
  StoreStatus, IOrganizerStore,
} from '../../models/types';
import {
  fetchOrganizer, updateParty, deleteParty, emptyOrganizer, resetOrganizer, updateOrganizer, addParty,
} from './organizerActions';

const initialState: IOrganizerStore = {
  organizer: emptyOrganizer,
  fetchStatus: StoreStatus.Idle,
  updateStatus: StoreStatus.Idle,
  updatePartyStatus: StoreStatus.Idle,
  addPartyStatus: StoreStatus.Idle,
  deletePartyStatus: StoreStatus.Idle,
  error: null,
};

export const organizerSlice = createSlice({
  name: 'organizer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // resetOrganizer cannot fail as it is just a simple assignation
      .addCase(resetOrganizer.fulfilled, (state, action) => {
        state.organizer = action.payload;
      })
      .addCase(fetchOrganizer.pending, (state) => {
        state.fetchStatus = StoreStatus.Pending;
      })
      .addCase(fetchOrganizer.fulfilled, (state, action) => {
        state.fetchStatus = StoreStatus.Fulfilled;
        state.organizer = action.payload;
      })
      .addCase(fetchOrganizer.rejected, (state, action) => {
        state.fetchStatus = StoreStatus.Rejected;
        state.error = action.error.message;
      })
      .addCase(updateOrganizer.pending, (state) => {
        state.updateStatus = StoreStatus.Pending;
      })
      .addCase(updateOrganizer.fulfilled, (state, action) => {
        state.updateStatus = StoreStatus.Fulfilled;
        state.organizer = action.payload;
      })
      .addCase(updateOrganizer.rejected, (state, action) => {
        state.updateStatus = StoreStatus.Rejected;
        state.error = action.error.message;
      })
      .addCase(updateParty.pending, (state) => {
        state.updatePartyStatus = StoreStatus.Pending;
      })
      .addCase(updateParty.fulfilled, (state, action) => {
        state.updatePartyStatus = StoreStatus.Fulfilled;
        state.organizer = { ...state.organizer, parties: action.payload };
      })
      .addCase(updateParty.rejected, (state, action) => {
        state.updatePartyStatus = StoreStatus.Rejected;
        state.error = action.error.message;
      })
      .addCase(addParty.pending, (state) => {
        state.addPartyStatus = StoreStatus.Pending;
      })
      .addCase(addParty.fulfilled, (state, action) => {
        state.addPartyStatus = StoreStatus.Fulfilled;
        state.organizer = { ...state.organizer, parties: action.payload };
      })
      .addCase(addParty.rejected, (state, action) => {
        state.addPartyStatus = StoreStatus.Rejected;
        state.error = action.error.message;
      })
      .addCase(deleteParty.pending, (state) => {
        state.deletePartyStatus = StoreStatus.Pending;
      })
      .addCase(deleteParty.fulfilled, (state, action) => {
        state.deletePartyStatus = StoreStatus.Fulfilled;
        state.organizer = { ...state.organizer, parties: action.payload };
      })
      .addCase(deleteParty.rejected, (state, action) => {
        state.deletePartyStatus = StoreStatus.Rejected;
        state.error = action.error.message;
      });
  }
});

export default organizerSlice.reducer;
