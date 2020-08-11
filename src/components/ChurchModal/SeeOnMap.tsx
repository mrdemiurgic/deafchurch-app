import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';

import { getSelectedMarker } from '../../store/markers/selectors';

import { hover, select } from '../../store/markers';
import { hideOverlay } from '../../store/userInterface';
import { setLongLat, setZoom } from '../../store/viewport';

import colors from '../../styles/colors.module.css';
import styles from './styles.module.css';

export default (): JSX.Element => {
  const dispatch = useDispatch();

  const { id, longLat } = useSelector(getSelectedMarker);

  const seeMap = () => {
    dispatch(hover(id));
    // dispatch(select(id));
    dispatch(hideOverlay());
    dispatch(setLongLat(longLat));
    dispatch(setZoom([9]));
  };

  return longLat ? (
    <div className={styles.contentButtonWrapper}>
      <button
        type="button"
        className={`${styles.contentButton} ${colors.buttonNeutral}`}
        onClick={seeMap}
      >
        <FontAwesomeIcon icon={faMapMarkedAlt} className={styles.contentIcon} />
        See on Map
      </button>
    </div>
  ) : (
    <></>
  );
};
