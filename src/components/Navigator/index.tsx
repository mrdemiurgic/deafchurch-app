import React from 'react';

import styles from './styles.module.css';
import MapButton from './Map';
import SearchButton from './Search';

export default (): JSX.Element => (
  <div className={styles.container}>
    <MapButton />
    <SearchButton />
  </div>
);
