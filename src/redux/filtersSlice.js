import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: { filter: '' },
  reducers: {
    changedFilter(state, { payload }) {
      state.name = payload;
    },
  },
});

export const { changedFilter } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
export const selectNameFilter = state => state.filters.filter;
