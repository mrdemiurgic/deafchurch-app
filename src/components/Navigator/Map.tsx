import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CSSTransition } from 'react-transition-group';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { unselect } from '../../store/markers';
import { hideOverlay } from '../../store/userInterface';

import fade from '../../styles/transitions/fade.module.css';
import colors from '../../styles/colors.module.css';
import styles from './styles.module.css';
import { RootState } from '../../store';

export default (): JSX.Element => {
  const dispatch = useDispatch();

  const show = useSelector(
    (state: RootState) => state.userInterface.showOverlay,
  );

  const click = () => {
    dispatch(hideOverlay());
    dispatch(unselect());
  };

  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      timeout={300}
      in={show}
      classNames={fade}
    >
      <button
        type="button"
        onClick={click}
        className={`${styles.button} ${colors.buttonPrimary}`}
      >
        <FontAwesomeIcon icon={faMapMarkedAlt} className={styles.buttonIcon} />
      </button>
    </CSSTransition>
  );
};
