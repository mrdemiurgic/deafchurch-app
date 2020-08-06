import React from 'react';

import { useSelector } from 'react-redux';

import { getSelectedMarker } from '../../store/markers/selectors';

import { description } from '../../utils/ministryType';

import styles from './styles.module.css';

export default (): JSX.Element => {
  const { ministryType } = useSelector(getSelectedMarker);

  return (
    <div className={styles.card}>
      <div className={styles.ministryTypeText}>{description(ministryType)}</div>
    </div>
  );
};
