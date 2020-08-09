import React from 'react';
import { useSelector } from 'react-redux';
import YourLocation from '.';

import { CSSTransition } from 'react-transition-group';

import { RootState } from '../../store';

import fade from '../../styles/transitions/fade.module.css';
import styles from './styles.module.css';

export default (): JSX.Element => {
  const show = useSelector(
    (state: RootState) => !state.userInterface.showOverlay,
  );

  return (
    <CSSTransition
      in={show}
      timeout={300}
      classNames={fade}
      mountOnEnter
      unmountOnExit
    >
      <div className={styles.topContainer}>
        <div className={styles.parentContainer}>
          <YourLocation />
        </div>
      </div>
    </CSSTransition>
  );
};
