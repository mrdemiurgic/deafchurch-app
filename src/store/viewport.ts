import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getGeo from '../utils/geo';

import { LongLat } from '../types/church';

interface ViewportState {
  zoom: [number];
  longLat: LongLat;
  originalLongLat: LongLat;
}

// CENTER OF USA
const defaultPosition = {
  longLat: [-97.380979, 42.877772],
  zoom: [3],
  originalLongLat: [-97.380979, 42.877772],
};

export const setInitialCenterFromGeo = createAsyncThunk(
  'viewport/setInitialPosition',
  async () => {
    const newLongLat = await getGeo();
    return newLongLat;
  },
);

const viewportSlice = createSlice({
  name: 'viewport',
  initialState: defaultPosition as ViewportState,
  reducers: {
    setZoom: (state, action) => {
      state.zoom = action.payload;
    },
    setLongLat: (state, action) => {
      state.longLat = action.payload;
    },
    setInitialCenter: (state, action) => {
      const { zoom, longLat } = action.payload;
      state.zoom = zoom;
      state.longLat = longLat;
      state.originalLongLat = longLat;
    },
  },
  extraReducers: {
    [setInitialCenterFromGeo.fulfilled.type]: (state, action) => {
      state.longLat = action.payload;
      state.originalLongLat = action.payload;
      state.zoom = [9];
    },
  },
});

export const { setZoom, setLongLat, setInitialCenter } = viewportSlice.actions;

export default viewportSlice.reducer;
