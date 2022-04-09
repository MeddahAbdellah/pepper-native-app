import { createSlice } from '@reduxjs/toolkit';
import { IOrganizerStore, StoreStatus } from '../../models/types';
import {
  emptyOrganizer, fetchOrganizer, updateOrganizer, createParty, resetOrganizer,
} from './organizerActions';



const initialState: IOrganizerStore = {
  organizer: emptyOrganizer,
  fetchStatus: StoreStatus.Idle,
  updateStatus: StoreStatus.Idle,
  error: null
};



export const organizerSlice = createSlice({
  name: 'organizer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.
      addCase(resetOrganizer.fulfilled, (state, action) => {
        state.organizer = action.payload;
      }).
      addCase(fetchOrganizer.pending, (state) => {
        state.fetchStatus = StoreStatus.Pending;
      }).
      addCase(fetchOrganizer.fulfilled, (state, action) => {
        state.fetchStatus = StoreStatus.Fulfilled;
        const { parties } = state.organizer;
        state.organizer = { ...action.payload, parties };
      }).
      addCase(fetchOrganizer.rejected, (state, action) => {
        state.fetchStatus = StoreStatus.Rejected;
        state.error = action.error.message;
      }).
      addCase(updateOrganizer.fulfilled, (state, action) => {
        state.updateStatus = StoreStatus.Fulfilled;
        state.organizer = action.payload;
      }).
      addCase(updateOrganizer.pending, (state) => {
        state.updateStatus = StoreStatus.Pending;
      }).
      addCase(updateOrganizer.rejected, (state, action) => {
        state.updateStatus = StoreStatus.Rejected;
        state.error = action.error.message;
      }).
      addCase(createParty.pending, (state) => {
        state.updateStatus = StoreStatus.Pending;
      }).
      addCase(createParty.fulfilled, (state, action) => {
        state.updateStatus = StoreStatus.Fulfilled;
        state.organizer = { ...state.organizer, parties: action.payload };
      }).
      addCase(createParty.rejected, (state, action) => {
        state.updateStatus = StoreStatus.Rejected;
        state.error = action.error.message;
      });
  }
});

export default organizerSlice.reducer;
