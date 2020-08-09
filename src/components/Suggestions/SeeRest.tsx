import React from 'react';

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
      <div className={styles.seeMore}>
        {`${numSuggestions - 5} `}
        more suggestions
      </div>
      <button
        type="button"
        className={`${styles.button} ${colors.buttonNeutral}`}
        onClick={onClick}
      >
        See rest
      </button>
    </div>
  );
};
