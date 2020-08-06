import elasticlunr from 'elasticlunr';

import getChurchIndex from './churches';

import distance from '../distance';

import { Church, LongLat } from '../../types/church';

import { SearchDoc, SearchDocData } from '../../types/userInterface';

const SEARCH_LETTER_LIMIT = 3;
const SUGGESTIONS_LIMIT = 5;

const index = elasticlunr<SearchDoc>();
index.addField('name');

export const initializeEngine = (churches: Church[]): void => {
  getChurchIndex(churches).map((doc) => index.addDoc(doc));
};

export const lookupEngine = (
  searchText: string,
  center: LongLat
): SearchDocData[] => {
  if (searchText.length >= SEARCH_LETTER_LIMIT) {
    const searchResult = index.search(searchText, {
      fields: {
        name: { bool: 'AND' },
      },
      expand: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
    const suggestions = searchResult
      .map((result) => index.documentStore.getDoc(result.ref).data)
      .sort(
        (suggestion1: SearchDocData, suggestion2: SearchDocData) =>
          distance(suggestion1.longLat, center) -
          distance(suggestion2.longLat, center)
      );
    // .splice(0, SUGGESTIONS_LIMIT);
    return suggestions;
  }
  return [];
};
