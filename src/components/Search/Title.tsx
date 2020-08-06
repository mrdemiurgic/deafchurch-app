import React from 'react';

import styles from './styles.module.css';

const defaultText = 'Find a Deaf Church!';

export default (): JSX.Element => (
  <div className={styles.title}>{defaultText}</div>
);
