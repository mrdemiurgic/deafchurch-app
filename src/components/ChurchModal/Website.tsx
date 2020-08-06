import React from 'react';

import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import fixUrl from '../../utils/website';

import { getSelectedMarker } from '../../store/markers/selectors';

import colors from '../../styles/colors.module.css';
import styles from './styles.module.css';

export default (): JSX.Element => {
  const { website } = useSelector(getSelectedMarker);

  const openTab = () => {
    window.open(fixUrl(website));
  };

  return website ? (
    <div className={styles.contentButtonWrapper}>
      <button
        type="button"
        className={`${styles.contentButton} ${colors.buttonPrimary}`}
        onClick={openTab}
      >
        <FontAwesomeIcon icon={faGlobe} className={styles.contentIcon} />
        Website
      </button>
    </div>
  ) : (
    <></>
  );
};
