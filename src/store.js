import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./features/userSlice";
import sliderReducer from "./features/sliderSlice";
import serviceReducer from "./features/serviceSlice"

export const store = configureStore({
    reducer: {
     user:userReducer,
     slider:sliderReducer,
     service:serviceReducer,
     
    },
  });