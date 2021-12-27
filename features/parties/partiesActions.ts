import { createAsyncThunk } from "@reduxjs/toolkit"
import { fakeFetch, fakeParties } from "../../services/fake";

export const fetchParties = createAsyncThunk('user/fetchParties', async () => {
  const response = await fakeFetch({ parties: fakeParties }, 2000);
  return response.parties;
});
