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
  interests: ['Science', 'Art', 'Socialism'],
  matches: [],
  parties: [],
}

const initialState: { user: IUser, status: string, error: any } = {
  user: emptyUser,
  status: 'idle',
  error: null,
};

const pendingReducer = (state: any) => {
  state.status = StoreStatus.Pending;
};

const rejectedReducer = (state: any, action: any) => {
  state.status = StoreStatus.Rejected;
  state.error = action.error.message;
};

export const userSlice = createSlice({
  name: 'user' ,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, pendingReducer)
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = StoreStatus.Fulfilled;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, rejectedReducer)
      .addCase(updateMatch.pending, pendingReducer)
      .addCase(updateMatch.fulfilled, (state, action) => {
        state.status = StoreStatus.Fulfilled;
        state.user.matches = action.payload;
      })
      .addCase(updateMatch.rejected, rejectedReducer)
      .addCase(updateParty.pending, pendingReducer)
      .addCase(updateParty.fulfilled, (state, action) => {
        state.status = StoreStatus.Fulfilled;
        state.user.parties = action.payload;
      })
      .addCase(updateParty.rejected, rejectedReducer);
  }
})

export default userSlice.reducer;
