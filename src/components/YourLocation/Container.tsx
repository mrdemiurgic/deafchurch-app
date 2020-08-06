import React from 'react';
import { useSelector } from 'react-redux';
import YourLocation from '.';

import { RootState } from '../../store';

import styles from './styles.module.css';

export default (): JSX.Element => {
  const show = useSelector(
    (state: RootState) => !state.userInterface.showOverlay,
  );

  return show ? (
    <div className={styles.topContainer}>
      <div className={styles.parentContainer}>
        <YourLocation />
      </div>
    </div>
  ) : (
    <></>
  );
};
