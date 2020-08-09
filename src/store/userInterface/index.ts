import { createSlice, createAction } from '@reduxjs/toolkit';
import { SearchDocData } from '../../types/userInterface';
import { setInitialCenterFromGeo } from '../viewport';

type SuggestionsMode = 'deafChurches' | 'hearingChurches' | 'searchText';

interface UserInterfaceState {
  searchText: string;
  searchRange: number; // in miles
  showOverlay: boolean;
  newlyLoaded: boolean;
  suggestionsMode: SuggestionsMode;
  loading: boolean;
}

const defaultState: UserInterfaceState = {
  searchText: '',
  searchRange: 75,
  loading: true,
  newlyLoaded: true,
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
    finishedLoading: (state) => {
      state.loading = false;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
      state.suggestionsMode = 'searchText';
    },
    findDeafChurches: (state) => {
      state.suggestionsMode = 'deafChurches';
    },
    findHearingChurches: (state) => {
      state.suggestionsMode = 'hearingChurches';
    },
    showOverlay: (state) => {
      state.showOverlay = true;
      state.newlyLoaded = false;
    },
    hideOverlay: (state) => {
      state.showOverlay = false;
      state.newlyLoaded = false;
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
  setSearchRange,
  showOverlay,
  hideOverlay,
  setSearchText,
  findDeafChurches,
  findHearingChurches,
  finishedLoading,
} = userInterfaceSlice.actions;

export default userInterfaceSlice.reducer;
