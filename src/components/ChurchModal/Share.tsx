import React from 'react';

import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faShareAlt } from '@fortawesome/free-solid-svg-icons';

import { getSelectedMarker } from '../../store/markers/selectors';

import share, { hasShare } from '../../utils/share';

import colors from '../../styles/colors.module.css';
import styles from './styles.module.css';

export default (): JSX.Element => {
  const { name, id } = useSelector(getSelectedMarker);

  return hasShare ? (
    <div className={styles.contentButtonWrapper}>
      <button
        type="button"
        className={`${styles.contentButton} ${colors.buttonPrimary}`}
        onClick={() => share(id, name)}
      >
        <FontAwesomeIcon icon={faShareAlt} className={styles.contentIcon} />
        Share
      </button>
    </div>
  ) : (
    <></>
  );
};
