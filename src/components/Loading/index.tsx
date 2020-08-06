import React from 'react';

import { useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import { CSSTransition } from 'react-transition-group';
import { RootState } from '../../store';

import fade from '../../styles/transitions/fade.module.css';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import styles from './styles.module.css';

export default (): JSX.Element => {
  const loading = useSelector(
    (state: RootState) => state.userInterface.loading,
  );

  return (
    <CSSTransition in={loading} timeout={300} classNames={fade}>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <Loader type="BallTriangle" color="white" visible />
          <div className={styles.loaderText}>Loading data...</div>
        </div>
      </div>
    </CSSTransition>
  );
};
