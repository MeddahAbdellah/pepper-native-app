import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import organizerReducer from '../features/organizer/organizerSlice';
import partiesReducer from '../features/parties/partiesSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    parties: partiesReducer,
    organizer: organizerReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
