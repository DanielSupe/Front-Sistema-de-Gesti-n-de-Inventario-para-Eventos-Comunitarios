import { createSlice } from '@reduxjs/toolkit';

type inventoryState = {
  inventory: any[];
  loans: any[];
  loading: boolean;
  success: boolean;
  error: string | null;
};

const initialState: inventoryState = {
  inventory: [],
  loans: [],
  loading: false,
  success: false,
  error: null,
};

const inventorylice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    getinventory(state) {
      state.loading = true;
      state.error = null;
    },
    getinventorySuccess(state, action) {
      state.inventory = action.payload;
      state.loading = false;
    },
    getinventoryFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    //----------------------------

    getLoads(state) {
      state.loading = true;
      state.error = null;
    },
    getLoadsSuccess(state, action) {
      state.loans = action.payload;
      state.loading = false;
    },
    getLoadsFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
    getinventory,
    getinventorySuccess,
    getinventoryFail,
    getLoads,
    getLoadsSuccess,
    getLoadsFail,
} = inventorylice.actions;

export const inventoryReducer = inventorylice.reducer;
