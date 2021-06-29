import { createSlice } from '@reduxjs/toolkit';

export const listSlice = createSlice({
  name: 'list',
  initialState: {
    value: [],
  },
  reducers: {
    loadList: (state, action) => {
      state.value = action.payload;
    },

    pushNewPhone: (state, action) => {
      state.value.push(action.payload);
    }
  },
})

export const { loadList, pushNewPhone } = listSlice.actions;

export default listSlice.reducer;