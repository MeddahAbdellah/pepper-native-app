import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiService from '../../services/api';
import { UtilService } from '../../services/util';

export const fetchParties = createAsyncThunk('user/fetchParties', async() => {
  const { parties } = await ApiService.get('party').catch(async(error) => UtilService.throwError(error));
  return parties;
});
