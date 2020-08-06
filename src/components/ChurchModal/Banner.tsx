import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import styles from './styles.module.css';

interface Props {
  icon: IconDefinition;
  text: string;
}

export default (props: Props): JSX.Element => {
  const { icon, text } = props;

  return (
    <div className={styles.banner}>
      <FontAwesomeIcon className={styles.bannerIcon} icon={icon} />
      {text}
    </div>
  );
};
