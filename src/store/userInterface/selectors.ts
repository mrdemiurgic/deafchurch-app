import { createSelector } from '@reduxjs/toolkit';

import cities from '../../data/cities.json';
import { RootState } from '..';
import { Church, LongLat } from '../../types/church';

import distance from '../../utils/distance';

import { lookupEngine } from '../../utils/searchEngine';
import { buildDocData } from '../../utils/searchEngine/buildDoc';
import { SearchDocData } from '../../types/userInterface';

export const getSearchText = (state: RootState): string => state.userInterface.searchText;

export const getOriginalCity = createSelector(
  (state: RootState) => state.viewport.originalLongLat,
  (longLat) => {
    const nearestCity = cities.sort((city1, city2) => (
      distance(city1.position as LongLat, longLat) - distance(city2.position as LongLat, longLat)
    ))[0];
    return `${nearestCity.name}, ${nearestCity.state}`;
  },
);

export const getCurrentCity = createSelector(
  (state: RootState) => state.viewport.longLat,
  (longLat) => {
    const nearestCity = cities.sort((city1, city2) => (
      distance(city1.position as LongLat, longLat) - distance(city2.position as LongLat, longLat)
    ))[0];
    return `${nearestCity.name}, ${nearestCity.state}`;
  },
);

const getSearchTextSuggestions = createSelector(
  getSearchText,
  (state: RootState) => state.viewport.longLat,
  (searchText, center) => lookupEngine(searchText, center),
);

const getNearbyChurches = createSelector(
  (state: RootState) => state.markers.all,
  (state: RootState) => state.userInterface.searchRange,
  (state: RootState) => state.viewport.longLat,
  (churches: Church[], range: number, center: LongLat) => {
    const nearChurches = churches.filter(
      (church) => (
        distance(church.longLat, center) <= range),
    ).sort((church1, church2) => (
      distance(church1.longLat, center) - distance(church2.longLat, center)));
    return nearChurches;
  },
);

const getNearbyDeafChurches = createSelector(
  getNearbyChurches,
  (nearChurches: Church[]) => {
    const deafChurches = nearChurches.filter(
      (church) => (church.ministryType === 'Independent' || church.ministryType === 'Supported'),
    ).map((church) => buildDocData(church));
    return deafChurches;
  },
);

const getNearbyHearingChurches = createSelector(
  getNearbyChurches,
  (nearChurches: Church[]) => {
    const deafChurches = nearChurches.filter(
      (church) => (church.ministryType === 'Accessibility' || church.ministryType === 'Integrated'),
    ).map((church) => buildDocData(church));
    return deafChurches;
  },
);

export const getSuggestions = createSelector(
  (state: RootState) => state.userInterface.suggestionsMode,
  getSearchTextSuggestions,
  getNearbyDeafChurches,
  getNearbyHearingChurches,
  (mode, searchText, deafChurches, hearingChurches) => {
    switch (mode) {
      case 'deafChurches':
        return deafChurches;
      case 'hearingChurches':
        return hearingChurches;
      case 'searchText':
        return searchText;
      default:
        return searchText;
    }
  },
);

export const getFirstSuggestion = createSelector(
  getSuggestions,
  (suggestions): SearchDocData | undefined => {
    if (suggestions.length > 0) {
      return suggestions[0];
    }
    return undefined;
  },
);
