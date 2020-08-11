// import { useLocation, useParams } from 'react-router-dom';
// import { LongLat } from '../types/church';

// type SearchMode = 'searchText' | 'deafChurches' | 'hearingChurches';

// interface HistoryState {
//   showOverlay: boolean;
//   searchText: string;
//   searchMode: SearchMode;
// }

// const defaultState: HistoryState = {
//   showOverlay: false,
//   searchText: '',
//   searchMode: 'deafChurches',
// };

// export default (): HistoryState => {
//   const location = useLocation();

//   if (location.state !== undefined) {
//     const { zoom, longLat } = location.state as HistoryState;

//     console.log(location.state);

//     const state = {
//       zoom,
//       longLat,
//     };

//     return state;
//   }

//   return defaultState;
// };

export default () => {};
