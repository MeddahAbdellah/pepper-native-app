import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiService from '../../services/api';

export const fetchParties = createAsyncThunk('user/fetchParties', async() => {
  const { parties } = await ApiService.get('party');
  return parties;
});
