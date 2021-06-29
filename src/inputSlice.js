import { createSlice } from '@reduxjs/toolkit';


export const inputSlice = createSlice({
  name: 'input',
  initialState: {
    code: "7",
    number: ""
  },
  reducers: {
    changeCode: (state, action) => {
      state.code = action.payload;
    },

    changeNumber: (state, action) => {
      state.number = action.payload;
    },
  },
})

export const { changeCode, changeNumber } = inputSlice.actions;

export default inputSlice.reducer;