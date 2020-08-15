import { createSelector } from '@reduxjs/toolkit';
import { Marker, Church } from '../../types/church';
import { RootState } from '..';

const emptyMarker: Marker = {
  id: '',
  name: '',
  denomination: '',
  email: '',
  ministryType: 'Unknown',
  longLat: [0, 0],
  website: '',
  address: '',
  zip: '',
  city: '',
  state: '',
  phoneNumber: '',
  videoPhoneNumber: '',
  services: [],
  show: false,
};

const selected = (state: RootState) => state.markers.selected;
const showSelected = (state: RootState) => state.markers.showSelected;
const showHovering = (state: RootState) => state.markers.showHovering;
const hovering = (state: RootState) => state.markers.hovering;
const all = (state: RootState): Church[] => state.markers.all;

const getSelectedChurch = createSelector(selected, all, (id, churches):
| Church
| undefined => churches.find((church: Church) => church.id === id));

const getHoveringChurch = createSelector(hovering, all, (id, churches):
| Church
| undefined => churches.find((church: Church) => church.id === id));

export const getFilteredMarkers = all;

export const getSelectedMarker = createSelector(
  getSelectedChurch,
  showSelected,
  (church, show): Marker => {
    if (church !== undefined) {
      return {
        ...church,
        show,
      };
    }
    return emptyMarker;
  },
);

export const getHoveringMarker = createSelector(
  getHoveringChurch,
  showHovering,
  (church, show): Marker => {
    if (church !== undefined) {
      return {
        ...church,
        show,
      };
    }
    return emptyMarker;
  },
);
