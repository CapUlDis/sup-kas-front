import { configureStore } from '@reduxjs/toolkit';
import inputReducer from './inputSlice';
import listReducer from './listSlice';

export default configureStore({
  reducer: {
    input: inputReducer,
    list: listReducer
  },
});