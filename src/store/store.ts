import { configureStore } from '@reduxjs/toolkit';
import { inventoryReducer } from './inventory/inventorySlice';


export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
  },
});

// Inferencia de tipos para Thunk
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;