import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Church } from '../../types/church';
import fetchChurches from '../../utils/fetchChurches';

import { selectSuggestion } from '../userInterface';

interface MarkersState {
  hovering: string;
  showHovering: boolean;
  selected: string;
  showSelected: boolean;
  all: Church[];
}

const initialState: MarkersState = {
  hovering: '',
  showHovering: false,
  selected: '',
  showSelected: false,
  all: [],
};

export const fetchAllChurches = createAsyncThunk('markers/fetchAllChurches', async () => {
  const churches = await fetchChurches();
  return churches;
});

const markersSlice = createSlice({
  name: 'markers',
  initialState,
  reducers: {
    unhover: (state) => { state.showHovering = false; },
    hover: (state, action) => {
      state.showHovering = true;
      state.hovering = action.payload;
    },
    unselect: (state) => { state.showSelected = false; },
    select: (state, action) => {
      state.showSelected = true;
      state.selected = action.payload;
    },
  },
  extraReducers: {
    [fetchAllChurches.fulfilled.type]: (state, action) => { state.all = action.payload; },
    [selectSuggestion.type]: (state, action) => {
      const { type, id } = action.payload;

      if (type === 'church') {
        state.selected = id;
        state.showSelected = true;
        state.hovering = id;
        state.showHovering = true;
      }
    },
  },
});

export const {
  hover,
  unhover,
  select,
  unselect,
} = markersSlice.actions;

export default markersSlice.reducer;
