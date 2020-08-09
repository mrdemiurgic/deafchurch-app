import React from 'react';

import { CSSTransition } from 'react-transition-group';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faSearch } from '@fortawesome/free-solid-svg-icons';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setSearchText } from '../../store/userInterface';

import fade from '../../styles/transitions/fade.module.css';
import styles from './icon.module.css';

export default (): JSX.Element => {
  const dispatch = useDispatch();
  const { suggestionsMode, searchText } = useSelector(
    (state: RootState) => state.userInterface,
  );

  const clear = () => {
    dispatch(setSearchText(''));
  };

  const show = suggestionsMode === 'searchText' ? searchText !== '' : true;

  return (
    <>
      <div className={styles.container}>
        <FontAwesomeIcon icon={faSearch} className={styles.icon} />
      </div>

      <CSSTransition
        classNames={fade}
        in={show}
        mountOnEnter
        unmountOnExit
        timeout={300}
      >
        <button
          type="button"
          className={`${styles.eraseButton}`}
          onClick={clear}
        >
          <FontAwesomeIcon icon={faTimesCircle} className={styles.icon} />
        </button>
      </CSSTransition>
    </>
  );
};
