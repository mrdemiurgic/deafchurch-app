import { createSlice, createAction } from '@reduxjs/toolkit';
import { SearchDocData } from '../../types/userInterface';
import { setInitialCenterFromGeo } from '../viewport';

type MapMode = 'changeLocation' | 'browse';
type SuggestionsMode = 'deafChurches' | 'hearingChurches' | 'searchText';

interface UserInterfaceState {
  searchText: string;
  searchRange: number; // in miles
  showOverlay: boolean;
  mapMode: MapMode;
  suggestionsMode: SuggestionsMode;
  showSuggestions: boolean;
  loading: boolean;
}

const defaultState: UserInterfaceState = {
  searchText: '',
  showSuggestions: false,
  searchRange: 75,
  loading: true,
  mapMode: 'browse',
  suggestionsMode: 'deafChurches',
  showOverlay: true,
};

export const selectSuggestion = createAction<SearchDocData>(
  'userInterface/selectSuggestion',
);

const userInterfaceSlice = createSlice({
  name: 'userInterface',
  initialState: defaultState,
  reducers: {
    showSuggestions: (state) => {
      state.showSuggestions = true;
    },
    hideSuggestions: (state) => {
      state.showSuggestions = false;
    },
    finishedLoading: (state) => {
      state.loading = false;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
      state.suggestionsMode = 'searchText';
      // if (action.payload.length > 0) {
      //   state.suggestionsMode = 'searchText';
      // }
    },
    findDeafChurches: (state) => {
      state.suggestionsMode = 'deafChurches';
      state.showSuggestions = true;
    },
    findHearingChurches: (state) => {
      state.suggestionsMode = 'hearingChurches';
      state.showSuggestions = true;
    },
    showOverlay: (state) => {
      state.showOverlay = true;
    },
    hideOverlay: (state) => {
      state.showOverlay = false;
    },
    setSearchRange: (state, action) => {
      state.searchRange = action.payload;
    },
  },
  extraReducers: {
    [setInitialCenterFromGeo.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [setInitialCenterFromGeo.rejected.type]: (state) => {
      state.loading = false;
    },
  },
});

export const {
  showSuggestions,
  hideSuggestions,
  setSearchRange,
  showOverlay,
  hideOverlay,
  setSearchText,
  findDeafChurches,
  findHearingChurches,
  finishedLoading,
} = userInterfaceSlice.actions;

export default userInterfaceSlice.reducer;
