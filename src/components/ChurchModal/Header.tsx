import React from 'react';

import { useSelector } from 'react-redux';

import { getSelectedMarker } from '../../store/markers/selectors';

import styles from './styles.module.css';

export default (): JSX.Element => {
  const { name, denomination, state, city } = useSelector(getSelectedMarker);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerName}>{name}</div>
      <div className={styles.headerDenomination}>
        {`${city}, ${state} - ${denomination || 'Unknown Denomination'}`}
      </div>
    </div>
  );
};
