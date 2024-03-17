// citizensSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  citizens: [],
  status: 'idle',
  error: null,
};

export const citizensSlice = createSlice({
  name: 'citizens',
  initialState,
  reducers: {
    getCitizens: (state, action) => {
      state.status = 'loading';
    },
    getCitizensSuccess: (state, action) => {
      state.status = 'succeeded';
      state.citizens = action.payload;
    },
    getCitizensFailed: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { getCitizens, getCitizensSuccess, getCitizensFailed } = citizensSlice.actions;

export default citizensSlice.reducer;
