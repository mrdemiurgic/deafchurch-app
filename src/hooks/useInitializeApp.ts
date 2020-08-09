import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { select, hover, fetchAllChurches } from '../store/markers';
import { finishedLoading } from '../store/userInterface';

import { initializeEngine } from '../utils/searchEngine';
import { setInitialCenter, setInitialCenterFromGeo } from '../store/viewport';
import { RootState } from '../store';

export default (): void => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchAllChurches());
  }, [dispatch]);

  const { all: markers } = useSelector((state: RootState) => state.markers);

  useEffect(() => {
    if (markers.length > 0) {
      initializeEngine(markers);
      const id = location.pathname.slice(1);

      if (id !== '') {
        const church = markers.find((marker) => marker.id === id);

        if (church !== undefined) {
          dispatch(
            setInitialCenter({
              zoom: [9],
              longLat: church.longLat,
            }),
          );
          dispatch(select(church.id));
          dispatch(hover(church.id));
          dispatch(finishedLoading());
        } else {
          dispatch(setInitialCenterFromGeo());
          // dispatch(finishedLoading());
        }
      } else {
        dispatch(setInitialCenterFromGeo());
        // dispatch(finishedLoading());
      }
    }
  }, [markers]);
};
