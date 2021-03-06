import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faSignLanguage,
  faAmericanSignLanguageInterpreting,
} from '@fortawesome/free-solid-svg-icons';
import { RootState } from '../../store';
import {
  findDeafChurches,
  findHearingChurches,
} from '../../store/userInterface';

import styles from './tabs.module.css';

export default (): JSX.Element => {
  const dispatch = useDispatch();

  const showDeafChurches = () => {
    dispatch(findDeafChurches());
  };

  const showHearingChurches = () => {
    dispatch(findHearingChurches());
  };

  const { suggestionsMode } = useSelector(
    (state: RootState) => state.userInterface,
  );

  const deafChurchesClasses = `${styles.button} ${
    suggestionsMode !== 'searchText' &&
    (suggestionsMode === 'deafChurches' ? styles.selected : styles.unselected)
  }`;
  const hearingChurchesClasses = `${styles.button} ${
    suggestionsMode !== 'searchText' &&
    (suggestionsMode === 'hearingChurches'
      ? styles.selected
      : styles.unselected)
  }`;

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <button
          type="button"
          className={deafChurchesClasses}
          onClick={showDeafChurches}
        >
          {/* <div className={styles.iconWrapper}> */}
          <FontAwesomeIcon className={styles.icon} icon={faSignLanguage} />
          {/* </div> */}
          {/* <div className={styles.text}>Deaf Churches</div> */}
          Deaf Churches
        </button>
      </div>
      <div className={styles.buttonContainer}>
        <button
          type="button"
          className={hearingChurchesClasses}
          onClick={showHearingChurches}
        >
          {/* <div className={styles.iconWrapper}> */}
          <FontAwesomeIcon
            className={styles.icon}
            icon={faAmericanSignLanguageInterpreting}
          />
          {/* </div> */}
          {/* <div className={styles.text}>Interpreted Churches</div> */}
          Interpreted Churches
        </button>
      </div>
    </div>
  );
};
