import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { unselect } from '../../store/markers';
import { hideOverlay } from '../../store/userInterface';

import styles from './styles.module.css';

interface Props {
  children: React.ReactNode;
}

export default (props: Props): JSX.Element => {
  const { children } = props;

  const dispatch = useDispatch();

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
    // eslint-disable-next-line
  }, []);

  return (
    <div role="none" className={styles.container} onClick={hideMe}>
      {children}
    </div>
  );
};
