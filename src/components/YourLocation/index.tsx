import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndoAlt } from '@fortawesome/free-solid-svg-icons';
import { RootState } from '../../store';
import {
  getCurrentCity,
  getOriginalCity,
} from '../../store/userInterface/selectors';

import { unselect, unhover } from '../../store/markers';

import { setLongLat, setZoom } from '../../store/viewport';

import styles from './styles.module.css';

export default (): JSX.Element => {
  const loading = useSelector(
    (state: RootState) => state.userInterface.loading,
  );
  const currentLocation = useSelector(getCurrentCity);
  const originalLocation = useSelector(getOriginalCity);
  const { originalLongLat } = useSelector((state: RootState) => state.viewport);
  const dispatch = useDispatch();

  const showReset = currentLocation !== originalLocation;

  const resetLocation = () => {
    dispatch(setLongLat(originalLongLat));
    dispatch(setZoom([9]));
    dispatch(unselect());
    dispatch(unhover());
  };

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        {loading ? 'Locating...' : currentLocation}
      </div>
      {showReset && (
        <button type="button" className={styles.button} onClick={resetLocation}>
          <FontAwesomeIcon icon={faUndoAlt} className={styles.icon} />
          {`Return to ${originalLocation}`}
        </button>
      )}
    </div>
  );
};
