import React from 'react';

import styles from './styles.module.css';

export default (): JSX.Element => (
  <div className={styles.container}>
    The church database is maintained by{' '}
    <a href="https://www.deafbiblesociety.com">Deaf Bible Society</a> under a
    project called <a href="https://deafchurchwhere.com">Deaf Church Where.</a>
    If your church is not present, please contact them to add yours!
  </div>
);
