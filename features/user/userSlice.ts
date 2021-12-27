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

const pendingAction = (state: any) => {
  state.status = StoreStatus.Pending;
};

const rejectedAction = (state: any, action: any) => {
  state.status = StoreStatus.Rejected;
  state.error = action.error.message;
};

export const userSlice = createSlice({
  name: 'user' ,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, pendingAction)
      .addCase(fetchUser.fulfilled, (state, action) => {
        console.log('FULFILLED');
        state.status = StoreStatus.Fulfilled;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, rejectedAction)
      .addCase(updateMatch.pending, pendingAction)
      .addCase(updateMatch.fulfilled, (state, action) => {
        state.status = StoreStatus.Fulfilled;
        state.user.matches = action.payload;
      })
      .addCase(updateMatch.rejected, rejectedAction)
      .addCase(updateParty.pending, pendingAction)
      .addCase(updateParty.fulfilled, (state, action) => {
        state.status = StoreStatus.Fulfilled;
        state.user.parties = action.payload;
      })
      .addCase(updateParty.rejected, rejectedAction);
  }
})

export default userSlice.reducer;
