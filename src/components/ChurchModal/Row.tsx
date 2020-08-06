import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.css';

interface Props {
  children: React.ReactNode;
  icon: IconDefinition;
}

export default (props: Props): JSX.Element => {
  const { children, icon } = props;

  return (
    <li className={styles.contentItem}>
      <FontAwesomeIcon icon={icon} className={styles.contentIcon} />
      <div className={styles.contentText}>{children}</div>
    </li>
  );
};
