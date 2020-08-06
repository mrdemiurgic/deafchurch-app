import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CSSTransition } from 'react-transition-group';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { getSelectedMarker } from '../../store/markers/selectors';
import { unselect } from '../../store/markers';
import { showOverlay, setSearchText } from '../../store/userInterface';

import colors from '../../styles/colors.module.css';
import fade from '../../styles/transitions/fade.module.css';
import styles from './styles.module.css';
import { RootState } from '../../store';

export default (): JSX.Element => {
  const dispatch = useDispatch();

  const click = () => {
    dispatch(unselect());
    dispatch(setSearchText(''));
    dispatch(showOverlay());
  };

  const overlayOn = useSelector(
    (state: RootState) => state.userInterface.showOverlay,
  );
  const { show: markerSelected } = useSelector(getSelectedMarker);

  const show = (markerSelected && overlayOn) || !overlayOn;

  return (
    <CSSTransition
      unmountOnExit
      mountOnEnter
      in={show}
      timeout={300}
      classNames={fade}
    >
      <button
        type="button"
        onClick={click}
        className={`${styles.button} ${colors.buttonPrimary}`}
      >
        <FontAwesomeIcon icon={faSearch} className={styles.buttonIcon} />
      </button>
    </CSSTransition>
  );
};
