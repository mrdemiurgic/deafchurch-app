import React from 'react';

import buttons from '../../styles/buttons.module.css';
import colors from '../../styles/colors.module.css';
import styles from './styles.module.css';

interface Props {
  numSuggestions: number;
  onClick: () => void;
}

export default (props: Props): JSX.Element => {
  const { numSuggestions, onClick } = props;
  return (
    <div className={styles.suggestion}>
      <div className={styles.seeRest}>
        {`${numSuggestions - 5} `}
        more suggestions
      </div>
      <button
        type="button"
        className={`${buttons.button} ${colors.buttonNeutral}`}
        onClick={onClick}
      >
        <div className={styles.seeRestText}>See rest</div>
      </button>
    </div>
  );
};
