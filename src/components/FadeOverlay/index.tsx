import React, { useEffect, useRef } from 'react';

import { CSSTransition } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';

import { unselect } from '../../store/markers';
import { hideOverlay } from '../../store/userInterface';

import fade from '../../styles/transitions/fade.module.css';
import styles from './styles.module.css';
import { getSelectedMarker } from '../../store/markers/selectors';

interface Props {
  children: React.ReactNode;
}

export default (props: Props): JSX.Element => {
  const { children } = props;

  const dispatch = useDispatch();
  const showOverlay = useSelector(
    (state: RootState) => state.userInterface.showOverlay,
  );

  const { id, show } = useSelector(getSelectedMarker);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show && showOverlay && containerRef.current !== null) {
      containerRef.current.scrollTop = 0;
    }
  }, [showOverlay, show, id]);

  const hideMe = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      dispatch(hideOverlay());
      dispatch(unselect());
    }
  };

  useEffect(() => {
    const captureEsc = (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        dispatch(unselect());
        dispatch(hideOverlay());
      }
    };

    document.addEventListener('keydown', captureEsc, false);

    return () => {
      document.removeEventListener('keydown', captureEsc, false);
    };
  }, []);

  return (
    <CSSTransition in={showOverlay} classNames={fade} timeout={300}>
      <div
        ref={containerRef}
        role="none"
        className={styles.container}
        onClick={hideMe}
      >
        {children}
      </div>
    </CSSTransition>
  );
};
