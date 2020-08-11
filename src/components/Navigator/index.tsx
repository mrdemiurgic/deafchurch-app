import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt, faSearch } from '@fortawesome/free-solid-svg-icons';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';

import { getSelectedMarker } from '../../store/markers/selectors';
import { unselect, unhover } from '../../store/markers';
import { hideOverlay, showOverlay } from '../../store/userInterface';

import colors from '../../styles/colors.module.css';
import styles from './styles.module.css';

type Side = 'map' | 'search' | 'both';

export default (): JSX.Element => {
  const dispatch = useDispatch();
  const [side, setSide] = useState<Side>('search');
  const overlayOn = useSelector(
    (state: RootState) => state.userInterface.showOverlay,
  );
  const { show: markerSelected } = useSelector(getSelectedMarker);

  useEffect(() => {
    if (overlayOn) {
      if (markerSelected) {
        setSide('both');
      } else {
        setSide('map');
      }
    } else {
      setSide('search');
    }
  }, [overlayOn, markerSelected]);

  const clickMap = () => {
    dispatch(hideOverlay());
    dispatch(unselect());
    dispatch(unhover());
    // dispatch(unselect());
  };

  const clickSearch = () => {
    dispatch(unselect());
    // dispatch(setSearchText(''));
    dispatch(showOverlay());
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.flipper} ${side === 'search' ? styles.flip : ''}`}
      >
        <div className={`${styles.side} ${styles.map}`}>
          <button
            type="button"
            className={`${styles.button} ${colors.buttonPrimary}`}
            onClick={clickMap}
          >
            <FontAwesomeIcon
              className={styles.buttonIcon}
              icon={faMapMarkedAlt}
            />
          </button>
        </div>
        <div
          className={`${styles.side} ${styles.search}  ${
            side === 'both' ? styles.slideOut : ''
          }`}
        >
          <button
            type="button"
            className={`${styles.button} ${
              overlayOn ? colors.buttonPrimary : colors.buttonNeutral
            }`}
            onClick={clickSearch}
          >
            <FontAwesomeIcon className={styles.buttonIcon} icon={faSearch} />
          </button>
        </div>
      </div>
    </div>
  );
};
