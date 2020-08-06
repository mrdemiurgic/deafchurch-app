import React from 'react';

import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faDirections } from '@fortawesome/free-solid-svg-icons';

import { getSelectedMarker } from '../../store/markers/selectors';

import getDirections from '../../utils/direction';

import colors from '../../styles/colors.module.css';
import styles from './styles.module.css';

export default (): JSX.Element => {
  const { address, longLat } = useSelector(getSelectedMarker);

  const url = getDirections(`${longLat[1]},${longLat[0]}`);

  const openTab = () => {
    window.open(url);
  };

  return address ? (
    <div className={styles.contentButtonWrapper}>
      <button
        type="button"
        className={`${styles.contentButton} ${colors.buttonAction}`}
        onClick={openTab}
      >
        <FontAwesomeIcon icon={faDirections} className={styles.contentIcon} />
        Directions
      </button>
    </div>
  ) : (
    <></>
  );
};
