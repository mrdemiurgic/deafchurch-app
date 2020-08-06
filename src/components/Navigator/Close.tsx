import React from 'react';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { unselect } from '../../store/markers';
import { hideOverlay } from '../../store/userInterface';

import styles from './styles.module.css';

export default (): JSX.Element => {
  const dispatch = useDispatch();

  const close = () => {
    dispatch(unselect());
    dispatch(hideOverlay());
  };

  return (
    <button type="button" onClick={close} className={styles.closeContainer}>
      <FontAwesomeIcon icon={faTimes} className={styles.closeIcon} />
    </button>
  );
};
